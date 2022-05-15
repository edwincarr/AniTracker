from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, User_List, Anime
from app.forms import ListForm
from flask_login import current_user

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<int:userid>', methods=['GET'])
def getuserlist(userid):
  list = User_List.query.join(User).filter(User_List.user_id == userid).all()
  return {'user_list': [li.to_dict() for li in list]}

@list_routes.route('/', methods=['POST'])
def changeStatusStuff():
  form = ListForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print('++++++++++++++++++++++++++++++++++++++++')
    return current_user.to_dict()
  print('----------------------------------------')
  return current_user.to_dict()
