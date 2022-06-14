from flask import Blueprint
from app.models import Feed, Following
from flask_login import current_user

feed_routes = Blueprint('feed',__name__)

@feed_routes.route('/')
def getFeed():
  data = Feed.query.order_by(Feed.created_at.desc()).all()
  return {'feed': [post.to_dict() for post in data]}

@feed_routes.route('/following')
def getFollowingFeed():
  following = Following.query.filter(Following.user_id == current_user.id)
  following_list = [some.to_dict()['following']['id'] for some in following]
  data = Feed.query.filter(Feed.user_id.in_(following_list)).order_by(Feed.created_at.desc())
  return {'feed': [post.to_dict() for post in data]}
