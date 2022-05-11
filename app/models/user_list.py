from .db import db

class User_List(db.Model):
  __tablename__ = 'user_lists'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  anime_id = db.Column(db.Integer, db.ForeignKey('animes.id'), nullable=False)
  progress = db.Column(db.Integer)
  status = db.Column(db.Integer)
  score = db.Column(db.Integer)
  comment = db.Column(db.String(1000))
  rewatches = db.Column(db.Integer, default=0)

  user = db.relationship('User', back_populates='user_list')
  anime = db.relationship('Anime', back_populates='user_list')

  def to_dict(self):
    return {
      'id': self.id,
      'user': self.user.to_dict(),
      'anime': self.anime.to_dict(),
      'progress': self.progress,
      'status': self.status,
      'score': self.score,
      'comment': self.comment,
      'rewatches': self.rewatches
    }
