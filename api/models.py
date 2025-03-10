from api import db


class Campaign(db.Model):
    __tablename__ = 'campaigns'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)

class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)

class Character(db.Model):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title= db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)

class Location(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)