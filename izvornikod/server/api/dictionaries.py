from flask import abort, request
from flask_login import login_required

from db import db, dictionary_schema, dictionaries_schema
from db.models import Dictionary
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
