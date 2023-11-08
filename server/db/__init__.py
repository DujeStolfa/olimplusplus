from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import models, schemas

korisnik_schema = schemas.KorisnikSchema()
