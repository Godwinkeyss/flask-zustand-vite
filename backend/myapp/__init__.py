from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_migrate import Migrate
from sqlalchemy.exc import OperationalError
from sqlalchemy import create_engine


app = Flask(__name__)

DATABASE_URL = 'postgresql://flask_react_zustand_user:Dc25VIWOYePFQ1M3ncZpobalc5yUNFZm@dpg-culrm8btq21c7385rpbg-a.oregon-postgres.render.com/flask_react_zustand'
database_url = os.environ.get("DATABASE_URL", DATABASE_URL)
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)
    
    
app.config["SQLALCHEMY_DATABASE_URI"] =  database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

try:
    engine = create_engine(database_url)
    with engine.connect() as connection:
        print("✅ Database connection successful!")
except OperationalError as e:
    print("❌ Database connection failed:", str(e))
db=SQLAlchemy(app)
migrate = Migrate(app,db)

# Correct Static File Path YES
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



