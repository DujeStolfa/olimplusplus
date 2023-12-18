from flask import abort, request
import bcrypt

from db import db
from db.models import User
from . import api


@api.route("users/register-student", methods=["POST"])
def register_student():
    user_data = request.json

    password = "progi123"

    user = User(
        user_data["firstname"],
        user_data["lastname"],
        user_data["email"],
        password,
        "student",
    )
    db.session.add(user)
    db.session.commit()

    return "", 204


@api.route("users/create-admin", methods=["POST"])
def create_admin():
    user_data = request.json

    user = User(
        user_data["firstname"],
        user_data["lastname"],
        user_data["email"],
        user_data["password"],
        "admin",
    )
    db.session.add(user)
    db.session.commit()

    return "", 204


@api.route("/users/edit-password", methods=["PUT"])
def edit_password():
    user_data = request.json

    if "newPassword" not in user_data or "email" not in user_data:
        return abort(400)

    new_password = user_data["newPassword"]

    user = db.session.execute(
        db.select(User).where(User.email == user_data["email"])
    ).scalar()

    user.password = bcrypt.hashpw(
        new_password.encode("utf-8"), bcrypt.gensalt()
    ).decode()
    db.session.commit()

    user.passwordchanged = True
    db.session.commit()

    return "", 204
