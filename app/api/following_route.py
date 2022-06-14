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
  print(current_user.id, '\n\n\n\n\n\n\n\n\n\n\n\n', user_id)
  follows = Following(user_id=current_user.id, following_id=user_id)
  db.session.add(follows)
  db.session.commit()
  return
