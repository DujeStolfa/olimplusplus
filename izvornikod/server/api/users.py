from flask import request

from db import db
from db.models import Korisnik
from . import api

@api.route("users/register-student", methods=["POST"])
def register_student():
    user_data = request.json

    lozinka = "progi123"

    user = Korisnik(
        user_data["ime"],
        user_data["prezime"],
        user_data["email"],
        lozinka,
        "ucenik",
    )
    db.session.add(user)
    db.session.commit()

    return "", 204
