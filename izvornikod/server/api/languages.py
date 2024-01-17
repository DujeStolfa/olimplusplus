from flask_login import login_required
from db import db, languages_schema
from db.models import Language
from . import api


@api.route("languages/all")
@login_required
def get_languages():
    langs = db.session.execute(
        db.select(Language.languageid, Language.isocode, Language.languagename)
    ).all()

    return languages_schema.dump(langs)
