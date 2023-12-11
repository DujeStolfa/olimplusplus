from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import models, schemas

user_schema = schemas.UserSchema()
