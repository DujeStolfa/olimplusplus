from flask import request

from db import db
from db.models import Language
from . import api


@api.route("lang", methods=["POST"])
def create_language():
    lang_data = request.json

    lang = Language(lang_data["languagename"], lang_data["isocode"])
    db.session.add(lang)
    db.session.commit()

    return "", 204
