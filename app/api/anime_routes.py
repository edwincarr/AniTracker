from flask import Blueprint
from app.models import Anime
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
  # if(page > 1):
  #   data = Anime.query.filter(Anime.id <= page*30, Anime.id > (page-1)*30).all()
  # elif(page == 1):
  #   data = Anime.query.filter(Anime.id <= 30, Anime.id > 0).all()
  #   print('\n\n\n\n\n\n\n', {'anime': [ani.to_dict() for ani in data]}, '\n\n\n\n\n\n')
  # return {'anime': [ani.to_dict() for ani in data]}
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
  # data = Anime.query.get(animeid)
  # return {'current': data.to_dict()}
