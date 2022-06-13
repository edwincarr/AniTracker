from .db import db

class Following(db.Model):
  __tablename__= 'following'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  following_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  # user = db.relationship('User', foreign_keys='user_id' , back_populates='follows')
  # following = db.relationship('User', foreign_keys='following_id' , back_populates='followed')

  def to_dict(self):
    return {
      'id':self.id,
      # 'user': self.user.to_dict(),
      # 'following': self.following.to_dict()
    }
