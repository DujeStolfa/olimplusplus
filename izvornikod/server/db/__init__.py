from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import models, schemas

user_schema = schemas.UserSchema()
users_schema = schemas.UserSchema(many=True)
dictionary_schema = schemas.DictionarySchema()
dictionaries_schema = schemas.DictionarySchema(many=True)
dictionary_word_states_schema = schemas.DictionaryWordStateSchema(many=True)
word_schema = schemas.WordSchema()
words_schema = schemas.WordSchema(many=True)
