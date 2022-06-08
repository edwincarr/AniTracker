from .db import db

class Anime(db.Model):
    __tablename__ = 'animes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    cover = db.Column(db.String, nullable=False)
    episodes = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String)

    user_list = db.relationship('User_List', back_populates='anime')
    comments = db.relationship('Comment', back_populates='anime')
    feed = db.relationship('Feed', back_populates='anime')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cover': self.cover,
            'episodes': self.episodes,
            'bio': self.bio
        }
