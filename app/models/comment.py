from .db import db
from datetime import datetime
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

class Comment(db.Model):
  __tablename__= 'comments'

  id = db.Column(db.Integer, primary_key=True)
  anime_id = db.Column(db.Integer, nullable=False)
  poster_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  content = db.Column(db.String(1000), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


  user = db.relationship('User', back_populates='comments')

  def to_dict(self):
    variables = {'id': self.anime_id}
    response = requests.post(url, json={'query': query, 'variables': variables})
    return {
      'id':self.id,
      'anime':response.json()['data']['Media'],
      'poster':self.user.to_dict(),
      'content':self.content,
      'created_at':self.created_at,
      'updated_at':self.updated_at
    }
