import bcrypt
from flask import abort, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user

from db import db, korisnik_schema
from db.models import Korisnik
from . import api


@api.route("/auth/users", methods=["POST"])
def add_user():
    """Privremena metoda za stvaranje korisnika"""
    user_data = request.json

    user = Korisnik(
        user_data["ime"],
        user_data["prezime"],
        user_data["email"],
        user_data["lozinka"],
        user_data["uloga"],
    )
    db.session.add(user)
    db.session.commit()

    return jsonify(user.korisnikid), 200


@api.route("/auth/login", methods=["POST"])
def login():
    login_data = request.json

    user = db.session.execute(
        db.select(Korisnik).where(Korisnik.email == login_data["email"])
    ).scalar()

    if user:
        if bcrypt.checkpw(
            login_data["lozinka"].encode("utf-8"), user.lozinka.encode("utf-8")
        ):
            if login_user(user):
                session.permanent = True

            return korisnik_schema.dump(user)

    return abort(401)


@api.route("/auth/logout", methods=["POST"])
@login_required
def logout():
    curr_id = current_user.korisnikid
    logout_user()
    return jsonify({"korisnikid": curr_id})


@api.route("/auth/current-user")
@login_required
def protected():
    return korisnik_schema.dump(current_user)
