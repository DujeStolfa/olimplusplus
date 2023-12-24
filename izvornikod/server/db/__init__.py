from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import models, schemas

user_schema = schemas.UserSchema()
users_schema = schemas.UserSchema(many=True)
dictionary_schema = schemas.DictionarySchema()
dictionaries_schema = schemas.DictionarySchema(many=True)
