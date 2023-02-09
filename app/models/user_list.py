from .db import db
import requests

query = '''
query ($id:Int){
    Media(id:$id){
      id
      name: title {
        userPreferred
      }
      cover: coverImage {
        extraLarge
      }
      episodes
      bio: description
    }
}
'''

url = 'https://graphql.anilist.co'

class User_List(db.Model):
  __tablename__ = 'user_lists'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  anime_id = db.Column(db.Integer, nullable=False)
  progress = db.Column(db.Integer)
  status = db.Column(db.Integer)
  score = db.Column(db.Integer)
  comment = db.Column(db.String(1000))
  rewatches = db.Column(db.Integer, default=0)

  user = db.relationship('User', back_populates='user_list')


  def to_dict(self):
    variables = {'id': self.anime_id}
    response = requests.post(url, json={'query': query, 'variables': variables})
    return {
      'id': self.id,
      'user': self.user.to_dict(),
      'anime': response.json()['data']['Media'],
      'progress': self.progress,
      'status': self.status,
      'score': self.score,
      'comment': self.comment,
      'rewatches': self.rewatches
    }
