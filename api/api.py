from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
import os

app = Flask(__name__)
CORS(app)

# Get the absolute path for the database file
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'dnd.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Import the models after initializing db
from models import Campaign, Session, Location, Character

# Define routes and views
@app.route('/campaigns', methods=['POST'])
def create_campaign():
    data = request.json
    campaign = Campaign(title=data['title'], description=data.get('description'))
    db.session.add(campaign)
    db.session.commit()
    return jsonify({"message": "Campaign created!", "id": campaign.id})

@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.all()
    return jsonify([{ "id": c.id, "title": c.title, "description": c.description } for c in campaigns])

@app.route('/sessions', methods=['POST'])
def create_session():
    data = request.json
    session = Session(title=data['title'], description=data.get('description'), campaign_id=data['campaign_id'])
    db.session.add(session)
    db.session.commit()
    return jsonify({"message": "Session created!", "id": session.id})

@app.route('/sessions', methods=['GET'])
def get_sessions():
    sessions = Session.query.all()
    return jsonify([{ "id": s.id, "title": s.title, "description": s.description, "campaign_id": s.campaign_id } for s in sessions])


@app.route('/characters', methods=['POST'])
def create_character():
    data = request.json
    character = Character(title=data['title'], description=data['description'], campaign_id=data['campaign_id'])
    db.session.add(character)
    db.session.commit()
    return jsonify({"message": "Character created!", "id": character.id})

@app.route('/characters', methods=['GET'])
def get_characters():
    characters = Character.query.all()
    return jsonify([{"id": c.id,"title": c.title,"description": c.description,"campaign_id": c.campaign_id} for c in characters])


@app.route('/locations', methods=['POST'])
def create_location():
    data = request.json
    location = Location(title=data['title'], description=data.get('description'), campaign_id=data['campaign_id'])
    db.session.add(location)
    db.session.commit()
    return jsonify({"message": "Location created!", "id": location.id})

@app.route('/locations', methods=['GET'])
def get_locations():
    locations = Location.query.all()
    return jsonify([{"id": l.id,"title": l.title,"description": l.description,"campaign_id": l.campaign_id} for l in locations])




with app.app_context():
    db.create_all()
    print("Database and tables created!")
app.run(debug=True)
