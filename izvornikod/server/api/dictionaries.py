from datetime import datetime
from flask import abort, request
from flask_login import login_required
from sqlalchemy import distinct, func

from db import db, dictionary_schema, dictionaries_schema, dictionary_word_states_schema
from db.models import Dictionary, Language, WordDictionary, Word, WordState
from . import api


@api.route("dictionaries/<int:languageid>", methods=["POST"])
@login_required
def create_dictionary(languageid):
    dict_data = request.json

    if "dictionaryname" not in dict_data:
        return abort(500)

    new_dict = Dictionary(dict_data["dictionaryname"], languageid)
    db.session.add(new_dict)
    db.session.commit()

    return dictionary_schema.dump(new_dict)


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


@api.route("dictionaries/<int:languageid>")
@login_required
def get_dictionaries(languageid):
    dictionaries = db.session.execute(
        db.select(
            Dictionary.dictionaryid,
            Dictionary.dictionarycreatedat,
            Dictionary.dictionaryname,
        ).where(Dictionary.languageid == languageid)
    ).all()

    return dictionaries_schema.dump(dictionaries)


@api.route("dictionaries/add-words", methods=["POST"])
@login_required
def add_word_to_dictionary():
    # Ovo triba pretvorit u add words, triba primat vise rici odjednon
    # u requestu bi trebao doci array identifikatora rijeci, tj samo niz brojeva
    # koje onda samo treba dodati u relaciju word_dict
    word_dict_data = request.json

    word_dict = WordDictionary(word_dict_data["wordid"], word_dict_data["dictionaryid"])
    db.session.add(word_dict)
    db.session.commit()

    return "", 204


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
