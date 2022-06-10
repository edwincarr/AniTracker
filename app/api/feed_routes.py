from flask import Blueprint
from app.models import Feed

feed_routes = Blueprint('feed',__name__)

@feed_routes.route('/')
def getFeed():
  data = Feed.query.all()
  return {'feed': [post.to_dict() for post in data]}
