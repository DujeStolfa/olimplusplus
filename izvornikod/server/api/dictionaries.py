from datetime import datetime
from flask import abort, request
from flask_login import login_required
from sqlalchemy import distinct, func

from db import (
    db,
    dictionary_schema,
    dictionaries_schema,
    dictionary_word_states_schema,
    words_schema,
)
from db.models import Dictionary, Language, WordDictionary, Word, WordState
from . import api


@api.route("dictionaries/<int:languageid>", methods=["POST"])
@login_required
def create_dictionary(languageid):
    dict_data = request.json

    if "dictionaryname" not in dict_data:
        return abort(400)

    if len(dict_data["dictionaryname"]) == 0:
        return abort(403)

    new_dict = Dictionary(dict_data["dictionaryname"], languageid)
    db.session.add(new_dict)
    db.session.commit()

    serialized = dictionary_schema.dump(new_dict)
    serialized["dictionarysize"] = 0

    return serialized


@api.route("dictionaries/<int:dictionaryid>", methods=["DELETE"])
@login_required
def delete_dictionary(dictionaryid):
    dictionary = db.session.execute(
        db.select(Dictionary).where(Dictionary.dictionaryid == dictionaryid)
    ).scalar()

    if dictionary == None:
        return abort(404)

    db.session.delete(dictionary)
    db.session.commit()

    return "", 204


@api.route("dictionaries/<int:dictionaryid>", methods=["PUT"])
@login_required
def rename_dictionary(dictionaryid):
    data = request.json

    if "dictionaryname" not in data:
        return abort(400)

    dictionary = db.session.execute(
        db.select(Dictionary).where(Dictionary.dictionaryid == dictionaryid)
    ).scalar()

    dictionary.dictionaryname = data["dictionaryname"]
    db.session.commit()

    dict_size = db.session.execute(
        db.select(func.count(distinct(Word.wordid)))
        .join(WordState)
        .join(WordDictionary)
        .where(WordDictionary.dictionaryid == dictionaryid)
    ).scalar()

    serialized = dictionary_schema.dump(dictionary)
    serialized["dictionarysize"] = dict_size

    return serialized


@api.route("dictionaries/<int:languageid>")
@login_required
def get_dictionaries(languageid):
    dictionaries = db.session.execute(
        db.select(
            Dictionary.dictionaryid,
            Dictionary.dictionarycreatedat,
            Dictionary.dictionaryname,
            (
                db.select(func.count(distinct(Word.wordid)))
                .join(WordState)
                .join(WordDictionary)
                .where(WordDictionary.dictionaryid == Dictionary.dictionaryid)
            ).label("dictionarysize"),
        ).where(Dictionary.languageid == languageid)
    ).all()

    return dictionaries_schema.dump(dictionaries)


@api.route("dictionaries/add-words", methods=["POST"])
@login_required
def add_words_to_dictionary():
    word_dict_data = request.json

    if "dictionaryid" not in word_dict_data or "wordids" not in word_dict_data:
        return abort(400)

    dictionary_id = word_dict_data["dictionaryid"]
    word_ids = word_dict_data["wordids"]

    added_words = [WordDictionary(wordid, dictionary_id) for wordid in word_ids]
    db.session.bulk_save_objects(added_words)
    db.session.commit()

    words = db.session.execute(
        db.select(
            Word.wordid,
            Word.audiopath,
            Word.croatianname,
            Word.foreignname,
            Word.languageid,
        ).where(Word.wordid.in_(word_ids))
    ).all()

    return words_schema.dump(words), 200


@api.route("dictionaries/<int:languageid>/student/<int:studentid>")
@login_required
def get_student_dictionaries(languageid, studentid):
    dictionaries = db.session.execute(
        db.select(
            Dictionary.dictionaryid,
            Dictionary.dictionaryname,
            (
                db.select(func.count(distinct(Word.wordid)))
                .join(WordState)
                .join(WordDictionary)
                .where(WordDictionary.dictionaryid == Dictionary.dictionaryid)
                .where(WordState.userid == studentid)
            ).label("totalwordcount"),
            (
                db.select(func.count(distinct(Word.wordid)))
                .join(WordState)
                .join(WordDictionary)
                .where(WordDictionary.dictionaryid == Dictionary.dictionaryid)
                .where(WordState.userid == studentid)
                .where(WordState.bowlid != None)
            ).label("unfinishedwordcount"),
            (
                db.select(func.count(distinct(Word.wordid)))
                .join(WordState)
                .join(WordDictionary)
                .where(WordDictionary.dictionaryid == Dictionary.dictionaryid)
                .where(WordState.userid == studentid)
                .where(WordState.bowlid != None)
                .where(WordState.available_at <= datetime.utcnow())
            ).label("availablewordcount"),
        )
        .join(Language)
        .where(Language.languageid == languageid)
    ).all()

    return dictionary_word_states_schema.dump(dictionaries)
