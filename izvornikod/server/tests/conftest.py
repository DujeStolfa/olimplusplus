import bcrypt
import pytest

from db import db
from db.models import User, Word
from server import app as flask_app


@pytest.fixture(scope="session")
def app():
    flask_app.config.update(
        {
            "TESTING": True,
        }
    )

    yield flask_app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture(scope="module")
def login_student(app):
    with app.test_client() as client:
        response = client.post(
            "/api/auth/login",
            json={"email": "ucenik@ucenik.com", "password": "progi123"},
        )

        yield response

        client.post("/api/auth/logout")


@pytest.fixture(scope="module")
def login_admin(app):
    with app.test_client() as client:
        response = client.post(
            "/api/auth/login",
            json={"email": "admin@admin.com", "password": "progi123"},
        )

        yield response

        client.post("/api/auth/logout")


@pytest.fixture()
def revert_student_password_change(app, login_student):
    yield

    old_password_data = {"newPassord": "progi123", "email": "ucenik@ucenik.com"}

    with app.app_context():
        user = db.session.execute(
            db.select(User).where(User.email == old_password_data["email"])
        ).scalar()

        user.password = bcrypt.hashpw(
            old_password_data["newPassord"].encode("utf-8"), bcrypt.gensalt()
        ).decode()
        db.session.commit()


@pytest.fixture()
def revert_create_word(app, login_admin):
    croatianname = "Test hrvatski naziv"

    yield croatianname

    with app.app_context():
        created_word = db.session.execute(
            db.select(Word).where(Word.croatianname == croatianname)
        ).scalar()

        if created_word != None:
            db.session.delete(created_word)
            db.session.commit()


@pytest.fixture()
def study_session_setup_teardown(login_student, client):
    # Dodaj rječnik
    dictionary_data = {"dictionaryname": "Test dictionary"}

    dictionary = client.post("/api/dictionaries/1", json=dictionary_data)
    dictionaryid = dictionary.json["dictionaryid"]

    # Dodaj riječi
    words_data = [
        {
            "croatianname": "Cro 1",
            "foreignname": "Foreign 1",
            "audiopath": "Audio 1",
        },
        {
            "croatianname": "Cro 2",
            "foreignname": "Foreign 2",
            "audiopath": "Audio 2",
        },
        {
            "croatianname": "Cro 3",
            "foreignname": "Foreign 3",
            "audiopath": "Audio 3",
        },
    ]

    wordids = []
    for word in words_data:
        added_word = client.post("/api/words/1", json=word)
        wordids.append(added_word.json["wordid"])

    # Dodaj riječi u rječnik
    add_to_dict_input = {
        "dictionaryid": dictionaryid,
        "wordids": wordids,
    }

    client.post("/api/dictionaries/add-words", json=add_to_dict_input)

    # Pokreni test
    yield dictionaryid, wordids[0]

    # Izbriši rječnike
    client.delete(f"/api/dictionaries/{dictionaryid}")

    # Izbriši riječi
    for wordid in wordids:
        client.delete(f"/api/words/{wordid}")
