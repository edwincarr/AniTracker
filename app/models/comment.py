from .db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__= 'comments'

  id = db.Column(db.Integer, primary_key=True)
  anime_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  poster_id = db.Column(db.Integer, db.ForeignKey('animes.id'), nullable=False)
  content = db.Column(db.String(1000), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


  user = db.relationship('User', back_populates='comments')
  anime = db.relationship('Anime', back_populates='comments')

  def to_dict(self):
    return {
      'id':self.id,
      'anime':self.anime.to_dict(),
      'poster':self.user.to_dict(),
      'content':self.content,
      'created_at':self.created_at,
      'updated_at':self.updated_at
    }
