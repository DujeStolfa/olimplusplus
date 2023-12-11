import bcrypt
from flask import abort, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user

from db import db, user_schema
from db.models import User
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


@api.route("/auth/login", methods=["POST"])
def login():
    login_data = request.json

    user = db.session.execute(
        db.select(User).where(User.email == login_data["email"])
    ).scalar()

    if user:
        if bcrypt.checkpw(
            login_data["password"].encode("utf-8"), user.password.encode("utf-8")
        ):
            if login_user(user):
                session.permanent = True

            return user_schema.dump(user)

    return abort(401)


@api.route("/auth/logout", methods=["POST"])
@login_required
def logout():
    curr_id = current_user.userid
    logout_user()
    return jsonify({"userid": curr_id})


@api.route("/auth/current-user")
@login_required
def protected():
    return user_schema.dump(current_user)
