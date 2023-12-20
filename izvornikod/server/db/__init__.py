from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import models, schemas

user_schema = schemas.UserSchema()
dictionary_schema = schemas.DictionarySchema()
dictionaries_schema = schemas.DictionarySchema(many=True)
