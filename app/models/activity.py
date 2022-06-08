from .db import db
from datetime import datetime

class Feed(db.Model):
  __tablename__ = 'feed'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  anime_id = db.Column(db.Integer, db.ForeignKey('animes.id'))
  content = db.Column(db.String(755), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


  user = db.relationship('User', back_populates='feed')
  anime = db.relationship('Anime', back_populates='feed')

  def to_dict(self):
    return {
      'id' : self.id,
      'user' : self.user.to_dict(),
      'anime': self.anime.to_dict(),
      'content': self.content,
      'created_at':self.created_at,
      'updated_at':self.updated_at
    }
