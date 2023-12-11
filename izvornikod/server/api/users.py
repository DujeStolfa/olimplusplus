from flask import request

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
