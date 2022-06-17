from crypt import methods
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, Following, user

following_routes = Blueprint('following', __name__)

@following_routes.route('/', methods=['GET'])
def get_users_followers():
  data = Following.query.filter(Following.user_id == current_user.id)
  return {'following': [follow.to_dict() for follow in data]}

@following_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def follow(user_id):
  follows = Following(user_id=current_user.id, following_id=user_id)
  db.session.add(follows)
  db.session.commit()
  return 'success'

@following_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollow(user_id):
  data = Following.query.filter(Following.user_id == current_user.id, Following.following_id == user_id).one()
  print('\n\n\n\n\n\n\n\n\n', data)
  db.session.delete(data)
  db.session.commit()
  return 'success'

@following_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def isFollow(user_id):
  data = Following.query.filter(Following.user_id == current_user.id, Following.following_id == user_id).one_or_none()
  if data:
    return "true"
  return "false"
