from flask import Blueprint

feed_routes = Blueprint('feed',__name__)

@feed_routes.route('/')
def getFeed():
  return {'hello': 'dawdawdawdawdawdawdwadawdawdwad'}
