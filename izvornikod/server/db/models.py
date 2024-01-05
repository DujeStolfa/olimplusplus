import bcrypt
from datetime import datetime
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import INTERVAL

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


class Language(db.Model):
    languageid = db.Column(db.Integer, primary_key=True)
    languagename = db.Column(db.String(128), nullable=False)
    isocode = db.Column(db.String(8), nullable=False, unique=True)

    def __init__(self, languagename, isocode):
        self.languagename = languagename
        self.isocode = isocode


class Dictionary(db.Model):
    dictionaryid = db.Column(db.Integer, primary_key=True)
    dictionaryname = db.Column(db.String(128), nullable=False)
    dictionarycreatedat = db.Column(
        db.TIMESTAMP, nullable=False, default=datetime.utcnow
    )
    languageid = db.Column(db.ForeignKey(Language.languageid), nullable=False)

    def __init__(self, dictionaryname, languageid):
        self.dictionaryname = dictionaryname
        self.languageid = languageid


class Word(db.Model):
    wordid = db.Column(db.Integer, primary_key=True)
    croatianname = db.Column(db.String(128), nullable=False)
    foreignname = db.Column(db.String(128), nullable=False)
    audiopath = db.Column(db.String(128), nullable=False)
    languageid = db.Column(db.ForeignKey(Language.languageid), nullable=False)

    def __init__(self, croatianname, foreignname, audiopath, languageid):
        self.croatianname = croatianname
        self.foreignname = foreignname
        self.audiopath = audiopath
        self.languageid = languageid


class Phrase(db.Model):
    phraseid = db.Column(db.Integer, primary_key=True)
    phrase = db.Column(db.String(256), nullable=False)
    wordid = db.Column(db.ForeignKey(Word.wordid), nullable=False)

    def __init__(self, phrase, wordid):
        self.phrase = phrase
        self.wordid = wordid


class WordDictionary(db.Model):
    wordid = db.Column(db.ForeignKey(Word.wordid))
    dictionaryid = db.Column(db.ForeignKey(Dictionary.dictionaryid))

    __table_args__ = (db.PrimaryKeyConstraint(wordid, dictionaryid),)

    def __init__(self, wordid, dictionaryid):
        self.wordid = wordid
        self.dictionaryid = dictionaryid


class Bowl(db.Model):
    bowlid = db.Column(db.Integer, primary_key=True)
    interval = db.Column(INTERVAL, nullable=False)

    def __init__(self, interval):
        self.interval = interval


class WordState(db.Model):
    userid = db.Column(db.ForeignKey(User.userid))
    wordid = db.Column(db.ForeignKey(Word.wordid))
    bowlid = db.Column(db.ForeignKey(Bowl.bowlid), nullable=True)

    __table_args__ = (db.PrimaryKeyConstraint(userid, wordid),)

    def __init__(self, userid, wordid, bowlid=None):
        self.userid = userid
        self.wordid = wordid
        self.bowlid = bowlid
