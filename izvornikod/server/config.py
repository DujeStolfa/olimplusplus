from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY")


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI_DEV")

    # CORS & session
    CORS_HEADERS = "Content-Type"
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = True
    SESSION_PROTECTION = "strong"
    PERMANENT_SESSION_LIFETIME = 3600
