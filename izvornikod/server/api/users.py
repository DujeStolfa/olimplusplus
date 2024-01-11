from flask import abort, jsonify, request, session
import bcrypt

from db import db, user_schema, users_schema
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


@api.route("users/edit-admin/<int:userId>", methods=["POST"])
def edit_admin(userId):
    admin_data = request.json

    admin = User.query.filter_by(userid=userId, role="admin").first()

    if admin is None:
        return jsonify({"error": "Admin not found"}), 404

    admin.firstname = admin_data["firstname"]
    admin.lastname = admin_data["lastname"]
    admin.email = admin_data["email"]

    db.session.commit()

    return "", 204


@api.route("users/get-admins", methods=["GET"])
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


@api.route("users/delete-admin/<int:userId>", methods=["DELETE"])
def delete_admin(userId):
    admin = User.query.filter_by(userid=userId, role="admin").first()

    if admin is None:
        return jsonify({"error": "Admin not found"}), 404

    db.session.delete(admin)
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
