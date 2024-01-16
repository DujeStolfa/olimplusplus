import math
import random
from datetime import datetime

from flask import abort, jsonify, request
from flask_login import current_user, login_required
from googletrans import Translator

from db import db, word_schema, words_schema, phrases_schema
from db.models import Word, User, Bowl, WordDictionary, WordState, Phrase
from . import api

translator = Translator()


@api.route("words/<int:languageid>", methods=["POST"])
@login_required
def create_word(languageid):
    word_data = request.json

    fields = ["croatianname", "foreignname", "audiopath"]
    chk = [field in word_data for field in fields]
    if False in chk:
        return abort(400)

    new_word = Word(
        word_data["croatianname"],
        word_data["foreignname"],
        word_data["audiopath"],
        languageid,
    )

    db.session.add(new_word)
    db.session.commit()

    # Pri stvaranju riječi obavezno stvoriti zapise u WORD_STATE tablici

    students = db.session.execute(
        db.select(User.userid).where(User.role == "student")
    ).all()

    first_bowl_id = (
        db.session.execute(db.select(Bowl.bowlid).order_by(Bowl.interval))
        .first()
        .bowlid
    )

    word_states = [
        WordState(student.userid, new_word.wordid, first_bowl_id)
        for student in students
    ]

    db.session.bulk_save_objects(word_states)
    db.session.commit()

    if "phrases" in word_data:
        if len(word_data["phrases"]) > 0:
            phrases = [
                Phrase(curr_phrase["phrase"], new_word.wordid)
                for curr_phrase in word_data["phrases"]
            ]
            db.session.bulk_save_objects(phrases)
            db.session.commit()

    return word_schema.dump(new_word)


@api.route("words/<int:wordid>", methods=["PUT"])
@login_required
def edit_word(wordid):
    edit_data = request.json

    word: Word = db.session.execute(
        db.select(Word).where(Word.wordid == wordid)
    ).scalar()

    if word == None:
        return abort(404)

    word.audiopath = edit_data["audiopath"]
    word.croatianname = edit_data["croatianname"]
    word.foreignname = edit_data["foreignname"]
    db.session.commit()

    if "phrases" in edit_data:
        if len(edit_data["phrases"]) > 0:
            old_phrases = db.session.execute(
                db.select(Phrase).where(Phrase.wordid == wordid)
            ).scalars()

            for el in old_phrases:
                db.session.delete(el)
                db.session.commit()

            phrases = [
                Phrase(curr_phrase["phrase"], wordid)
                for curr_phrase in edit_data["phrases"]
            ]
            db.session.bulk_save_objects(phrases)
            db.session.commit()

    return word_schema.dump(word)


@api.route("words/<int:languageid>")
@login_required
def get_words(languageid):
    words = db.session.execute(
        db.select(
            Word.wordid, Word.croatianname, Word.foreignname, Word.audiopath
        ).where(Word.languageid == languageid)
    ).all()

    return words_schema.dump(words)


@api.route("words/details/<int:wordid>")
@login_required
def get_word_details(wordid):
    word = db.session.execute(
        db.select(
            Word.wordid, Word.croatianname, Word.foreignname, Word.audiopath
        ).where(Word.wordid == wordid)
    ).first()

    if word == None:
        return abort(404)

    phrases = db.session.execute(
        db.select(Phrase.phraseid, Phrase.phrase, Phrase.wordid).where(
            Phrase.wordid == wordid
        )
    ).all()

    serialized_word = word_schema.dump(word)
    serialized_phrases = phrases_schema.dump(phrases)
    serialized_word["phrases"] = serialized_phrases

    return serialized_word, 200


@api.route("words/in-dict/<int:dictionaryid>")
@login_required
def get_words_in_dictionary(dictionaryid):
    words_in_dictionary = db.session.execute(
        db.select(Word.wordid, Word.croatianname, Word.foreignname, Word.audiopath)
        .join(WordDictionary)
        .where(WordDictionary.dictionaryid == dictionaryid)
    ).all()

    return words_schema.dump(words_in_dictionary)


@api.route("words/dict/<int:dictionaryid>")
@login_required
def get_words_not_in_dictionary(dictionaryid):
    # endpoint za rijeci koje nisu u nekom rijecniku
    words_not_in_dictionary = db.session.execute(
        db.select(
            Word.wordid, Word.croatianname, Word.foreignname, Word.audiopath
        ).where(
            Word.wordid.not_in(
                db.select(Word.wordid)
                .join(WordDictionary)
                .where(WordDictionary.dictionaryid == dictionaryid)
            )
        )
    ).all()

    return words_schema.dump(words_not_in_dictionary)


@api.route("words/available/<int:dictionaryid>")
@login_required
def get_available_words(dictionaryid):
    words = db.session.execute(
        db.select(
            Word.wordid,
            Word.croatianname,
            Word.foreignname,
            Word.audiopath,
        )
        .join(WordState)
        .join(WordDictionary)
        .where(WordDictionary.dictionaryid == dictionaryid)
        .where(WordState.userid == current_user.userid)
        .where(WordState.bowlid != None)
        .where(WordState.available_at <= datetime.utcnow())
    ).all()

    return words_schema.dump(words)


@api.route("words/choice/<int:dictionaryid>/<int:wordid>")
@login_required
def get_multiple_choice(dictionaryid, wordid):
    words = db.session.execute(
        db.select(
            Word.wordid,
            Word.croatianname,
            Word.foreignname,
            Word.audiopath,
        )
        .join(WordDictionary)
        .where(WordDictionary.dictionaryid == dictionaryid)
        .where(Word.wordid != wordid)
    ).all()

    if len(words) < 3:
        return abort(403)

    choices = random.sample(words, 3)

    curr_word = db.session.execute(
        db.select(
            Word.wordid,
            Word.croatianname,
            Word.foreignname,
            Word.audiopath,
        ).where(Word.wordid == wordid)
    ).first()

    if curr_word == None:
        return abort(404)

    choices.append(curr_word)
    random.shuffle(choices)

    return words_schema.dump(choices)


@api.route("words/state/<int:wordid>", methods=["PUT"])
@login_required
def update_word_state(wordid):
    data = request.json

    if "correct" not in data:
        return abort(400)

    bowls = db.session.execute(
        db.select(Bowl.bowlid, Bowl.interval).order_by(Bowl.interval)
    ).all()

    if len(bowls) == 0:
        return abort(503)

    curr_word_state: WordState = db.session.execute(
        db.select(WordState)
        .where(WordState.wordid == wordid)
        .where(WordState.userid == current_user.userid)
    ).scalar()

    if curr_word_state == None:
        return abort(404)

    if curr_word_state.bowlid == None:
        return abort(400)

    bowl_ids = list(map(lambda x: x.bowlid, bowls))
    curr_bowl_idx = bowl_ids.index(curr_word_state.bowlid)
    new_bowl = None

    if data["correct"]:
        if curr_bowl_idx == len(bowls) - 1:
            new_bowl = None
        else:
            new_bowl = bowls[curr_bowl_idx + 1]

    else:
        new_bowl = bowls[0]  # vrati u prvu posudu

    if new_bowl != None:
        curr_word_state.bowlid = new_bowl.bowlid
        curr_word_state.available_at = datetime.utcnow() + new_bowl.interval
        db.session.commit()
    else:
        curr_word_state.bowlid = None
        db.session.commit()

    return "", 204


@api.route("words/<int:wordid>", methods=["DELETE"])
@login_required
def delete_word(wordid):
    word = db.session.execute(db.select(Word).where(Word.wordid == wordid)).scalar()

    if word == None:
        return abort(404)

    db.session.delete(word)
    db.session.commit()

    return "", 204


@api.route("words/getTranslation/<word>/<dest_isocode>")
def get_translation(word, dest_isocode):
    try:
        translation = translator.translate(word, src="hr", dest=dest_isocode)
        return translation.text, 200

    except:
        return abort(418)


@api.route("words/check-audio/<int:wordid>/<audiourl>")
def check_audio(wordid, audiourl):
    if len(audiourl) == 0:
        return abort(400)

    score = math.floor(random.random() * 10) + 1

    return jsonify({"score": score}), 200
