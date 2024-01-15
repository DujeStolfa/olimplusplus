from flask import abort, jsonify, request, session
import bcrypt
from flask_login import login_required

from db import db, user_schema, users_schema
from db.models import Bowl, User, Word, WordState
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

    # Dodati zapise u WORD_STATE tablicu
    words = db.session.execute(db.select(Word.wordid)).all()

    first_bowl_id = (
        db.session.execute(db.select(Bowl.bowlid).order_by(Bowl.interval))
        .first()
        .bowlid
    )

    word_states = [WordState(user.userid, word.wordid, first_bowl_id) for word in words]
    db.session.bulk_save_objects(word_states)
    db.session.commit()

    return "", 204


@api.route("users/create-admin", methods=["POST"])
@login_required
def create_admin():
    user_data = request.json

    fields = ["firstname", "lastname", "email", "password"]
    chk = [field in user_data for field in fields]
    if False in chk:
        return abort(400)

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


@api.route("users/edit-admin/<int:userid>", methods=["POST"])
@login_required
def edit_admin(userid):
    admin_data = request.json

    admin = db.session.execute(
        db.select(User).where(User.userid == userid).where(User.role == "admin")
    ).scalar()

    if admin is None:
        return abort(404)

    admin.firstname = admin_data["firstname"]
    admin.lastname = admin_data["lastname"]
    admin.email = admin_data["email"]

    db.session.commit()

    return "", 204


@api.route("users/get-admins", methods=["GET"])
@login_required
def get_admins():
    users = db.session.execute(
        db.select(
            User.userid,
            User.firstname,
            User.lastname,
            User.email,
            User.role,
            User.passwordchanged,
            User.usercreatedat,
        ).where(User.role == "admin")
    ).all()

    return users_schema.dump(users)


@api.route("users/delete-admin/<int:userid>", methods=["DELETE"])
@login_required
def delete_admin(userid):
    admin = db.session.execute(
        db.select(User).where(User.userid == userid).where(User.role == "admin")
    ).scalar()

    if admin is None:
        return abort(404)

    db.session.delete(admin)
    db.session.commit()

    return "", 204


@api.route("users/<int:userid>", methods=["DELETE"])
@login_required
def delete_user(userid):
    user = db.session.execute(db.select(User).where(User.userid == userid)).scalar()

    if user is None:
        return abort(404)

    db.session.delete(user)
    db.session.commit()

    return "", 204


@api.route("/users/edit-password", methods=["PUT"])
@login_required
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
