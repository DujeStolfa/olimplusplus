"""Endpoints used only during development"""
from flask import request, jsonify

from db import db
from db.models import User, Language, Bowl
from . import api


@api.route("/auth/users", methods=["POST"])
def add_user():
    """Privremena metoda za stvaranje Usera"""
    user_data = request.json

    user = User(
        user_data["firstname"],
        user_data["lastname"],
        user_data["email"],
        user_data["password"],
        user_data["role"],
    )
    db.session.add(user)
    db.session.commit()

    return jsonify(user.userid), 200


@api.route("lang", methods=["POST"])
def create_language():
    lang_data = request.json

    lang = Language(lang_data["languagename"], lang_data["isocode"])
    db.session.add(lang)
    db.session.commit()

    return "", 204


@api.route("/bowls", methods=["POST"])
def create_bowl():
    bowl_data = request.json

    bowl = Bowl(bowl_data["interval"])
    db.session.add(bowl)
    db.session.commit()

    return str(bowl.bowlid), 200
