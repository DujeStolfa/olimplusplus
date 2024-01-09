from flask import request
from flask_login import login_required
from sqlalchemy import and_

from db import db, word_schema, words_schema
from db.models import Word, User, Bowl, WordState, WordDictionary
from . import api


@api.route("words/<int:languageid>", methods=["POST"])
def create_word(languageid):
    word_data = request.json

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

    return word_schema.dump(new_word)


@api.route("words/<int:languageid>")
@login_required
def get_words(languageid):
    words = db.session.execute(
        db.select(Word.wordid, Word.croatianname, Word.foreignname).where(
            Word.languageid == languageid
        )
    ).all()

    return words_schema.dump(words)

@api.route("words/dict/<int:dictionaryid>") # endpoint za rijeci koje nisu u nekom rijecniku
@login_required
def get_words_not_in_dictionary(dictionaryid):
    words_not_in_dictionary = db.session.execute(
        db.select(Word.wordid, Word.croatianname, Word.foreignname)
        .where(Word.wordid.not_in(
            db.select(Word.wordid)
            .join(WordDictionary)))
    ).all()

    return words_schema.dump(words_not_in_dictionary)