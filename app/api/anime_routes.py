from flask import Blueprint, request
from app.models import User, db, Anime
from flask_login import current_user, login_user, logout_user, login_required


anime_routes = Blueprint('anime', __name__)

@anime_routes.route('/<int:page>')
def getAnime(page):
  if(page > 1):
    data = Anime.query.filter(Anime.id <= page*30, Anime.id > (page-1)*30).all()
  elif(page == 1):
    data = Anime.query.filter(Anime.id <= 30, Anime.id > 0).all()
  return {'anime': [ani.to_dict() for ani in data]}
