from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_migrate import Migrate
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db=SQLAlchemy(app)
migrate = Migrate(app,db)

# Correct Static File Path
backend_folder = os.path.dirname(os.path.abspath(__file__))  # myapp/
root_folder = os.path.dirname(os.path.dirname(backend_folder))  # flask-react/
frontend_folder = os.path.join(root_folder, "client")  # flask-react/client
dist_folder = os.path.join(frontend_folder, "dist")  # flask-react/client/dist

# Ensure the folder exists to prevent errors
if not os.path.exists(dist_folder):
    print(f"Warning: The directory {dist_folder} does not exist!")

# Serve React Frontend
@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def serve_frontend(filename):
    return send_from_directory(dist_folder, filename)


from myapp import routes



