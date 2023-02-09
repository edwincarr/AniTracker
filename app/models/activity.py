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

class Feed(db.Model):
  __tablename__ = 'feed'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  anime_id = db.Column(db.Integer)
  content = db.Column(db.String(755), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


  user = db.relationship('User', back_populates='feed')
  def to_dict(self):
    variables = {'id': self.anime_id}
    response = requests.post(url, json={'query': query, 'variables': variables})
    return {
      'id' : self.id,
      'user' : self.user.to_dict(),
      'anime':response.json()['data']['Media'] if self.anime_id != None else None,
      'content': self.content,
      'created_at':self.created_at,
      'updated_at':self.updated_at
    }
