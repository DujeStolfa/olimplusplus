import bcrypt
from flask_login import UserMixin
from datetime import datetime

from . import db


class Korisnik(db.Model, UserMixin):
    korisnikid = db.Column(db.Integer, primary_key=True)
    ime = db.Column(db.String(128), nullable=False)
    prezime = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(64), nullable=False, unique=True)
    lozinka = db.Column(db.String(64), nullable=False)
    korisnikstvorenna = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    uloga = db.Column(db.String(64), nullable=False)
    promijeniolozinku = db.Column(db.Boolean, nullable=False, default=False)

    __table_args__ = (
        db.CheckConstraint("uloga = ANY(ARRAY['admin','ucenik'])", name="chk_uloga"),
    )

    def __init__(self, ime, prezime, email, lozinka, uloga):
        self.ime = ime
        self.prezime = prezime
        self.email = email
        self.uloga = uloga
        self.lozinka = bcrypt.hashpw(lozinka.encode("utf-8"), bcrypt.gensalt()).decode()

    def get_id(self):
        return self.korisnikid
