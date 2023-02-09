from flask import Blueprint
from flask import json
import requests

anime_routes = Blueprint('anime', __name__)
pageQuery = '''
query ($page:Int){
  Page(page:$page,perPage:30){
    media(sort: POPULARITY_DESC, type:ANIME){
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
}
'''

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

@anime_routes.route('/browse/<int:page>')
def getAnime(page):
  variables = {
  'page':page
  }
  response = requests.post(url, json={'query': pageQuery, 'variables': variables})
  return {'anime': response.json()['data']['Page']['media']}

@anime_routes.route('/<int:animeid>')
def oneAnime(animeid):
  variables = {
  'id':animeid
  }
  response = requests.post(url, json={'query': query, 'variables': variables})
  return {'current': response.json()['data']['Media']}
