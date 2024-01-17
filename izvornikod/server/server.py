from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object("config.ProdConfig")

from db import db, models

migrate = Migrate(app, db)
db.init_app(app)

CORS(
    app,
    supports_credentials=True,
    resources=r"/api/*",
)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))


from api import api as api_blueprint

app.register_blueprint(api_blueprint, url_prefix="/api")
