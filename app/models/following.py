from .db import db

class Following(db.Model):
  __tablename__= 'following'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  following_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  user = db.relationship('User', back_populates='follows')

  def to_dict(self):
    return {
      'user': self.user.to_dict(),
      'following': self.user.to_dict()
    }
