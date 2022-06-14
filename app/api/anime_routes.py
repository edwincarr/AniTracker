from flask import Blueprint
from app.models import Anime


anime_routes = Blueprint('anime', __name__)

@anime_routes.route('/browse/<int:page>')
def getAnime(page):
  if(page > 1):
    data = Anime.query.filter(Anime.id <= page*30, Anime.id > (page-1)*30).all()
  elif(page == 1):
    data = Anime.query.filter(Anime.id <= 30, Anime.id > 0).all()
  return {'anime': [ani.to_dict() for ani in data]}

@anime_routes.route('/<int:animeid>')
def oneAnime(animeid):
  data = Anime.query.get(animeid)
  return {'current': data.to_dict()}
