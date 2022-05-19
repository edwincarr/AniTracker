from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, User_List, Anime
from app.forms import ListForm
from flask_login import current_user

list_routes = Blueprint('lists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@list_routes.route('/<int:userid>', methods=['GET'])
def getcurrentlist(userid):
  list = User_List.query.join(User).filter(User_List.user_id == userid).all()
  return {'current_list': [li.to_dict() for li in list]}

@list_routes.route('/', methods=['GET'])
def getuserlist():
  list = User_List.query.join(User).filter(User_List.user_id == current_user.id).all()
  return {'user_list': [li.to_dict() for li in list]}

@list_routes.route('/', methods=['POST'])
@login_required
def changeStatusStuff():
  form = ListForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_row = User_List(user_id=current_user.id, anime_id=form.data['animeid'], progress=form.data['progress'], status=form.data['status'], score=form.data['score'])
    anime = Anime.query.get(form.data['animeid'])
    if new_row.status == 2:
      new_row.progress = anime.episodes
    db.session.add(new_row)
    db.session.commit()
    return new_row.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}

@list_routes.route('/', methods=['PATCH'])
@login_required
def updateStatusStuff():
  form = ListForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    old_row = User_List.query.filter(User_List.user_id == current_user.id, User_List.anime_id == form.data['animeid']).one()
    anime = Anime.query.get(form.data['animeid'])
    old_row.progress = form.data['progress']
    old_row.status = form.data['status']
    old_row.score = form.data['score']
    if form.data['status'] == 2:
      old_row.progress = anime.episodes
    db.session.commit()
    return old_row.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}

@list_routes.route('/', methods=['DELETE'])
@login_required
def deleteStatusStuff():
  data = request.get_json()
  row = User_List.query.get(data['data'])
  db.session.delete(row)
  db.session.commit()
  return 'success'
