from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, User_List, Anime

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<int:userid>', methods=['GET'])
def getuserlist(userid):
  list = User_List.query.join(User).filter(User_List.user_id == userid).all()
  print(f'\n\n\n\n\n',list, f'\n\n\n\n\n\n\n')
  return {'user_list': [li.to_dict() for li in list]}
