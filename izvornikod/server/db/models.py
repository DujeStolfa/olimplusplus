import bcrypt
from flask_login import UserMixin
from datetime import datetime

from . import db


class User(db.Model, UserMixin):
    userid = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(128), nullable=False)
    lastname = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String(64), nullable=False)
    usercreatedat = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    role = db.Column(db.String(64), nullable=False)
    passwordchanged = db.Column(db.Boolean, nullable=False, default=False)

    __table_args__ = (
        db.CheckConstraint("role = ANY(ARRAY['admin','student'])", name="chk_role"),
    )

    def __init__(self, firstname, lastname, email, password, role):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.role = role
        self.password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode()

    def get_id(self):
        return self.userid
