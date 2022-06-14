from flask import Blueprint
from flask_login import login_required
from app.models import User, Following

following_routes = Blueprint('following', __name__)

@following_routes.route('/')
@login_required
def follow():
  print('\n\n\n')
