from flask import request
from flask_login import login_required

from db import db, word_schema, words_schema
from db.models import Word
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
