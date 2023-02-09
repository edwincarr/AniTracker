from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, User_List, Feed
from app.forms import ListForm
from flask_login import current_user
import requests

list_routes = Blueprint('lists', __name__)

query = '''
query ($id:Int){
    Media(id:$id){
      id
      name: title {
        userPreferred
      }
      cover: coverImage {
        extraLarge
      }
      episodes
      bio: description
    }
}
'''

url = 'https://graphql.anilist.co'

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
    # anime = Anime.query.get(form.data['animeid'])
    variables = {
      'id': form.data['animeid']
    }
    response = requests.post(url, json={'query': query, 'variables': variables})
    anime = response.json()['data']['Media']
    print('\n\n\n\n\n\n\n', data,anime,'\n\n\n\n\n\n\n')
    if new_row.status == 0:
      # plans to watch
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Plans to watch {anime["name"]["userPreferred"]}')
    if new_row.status == 1:
      # watching
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Watched episode {new_row.progress} of {anime["name"]["userPreferred"]}')
    if new_row.status == 2:
      # completed
      new_row.progress = anime['episodes']
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Completed {anime["name"]["userPreferred"]}')
    if new_row.status == 3:
      # Paused
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Paused {anime["name"]["userPreferred"]}')
    if new_row.status == 4:
      # Dropped
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Dropped {anime["name"]["userPreferred"]}')
    db.session.add(feed_update)
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
    # anime = Anime.query.get(form.data['animeid'])
    variables = {
      'id': form.data['animeid']
    }
    response = requests.post(url, json={'query': query, 'variables': variables})
    anime = response.json()['data']['Media']
    old_row.progress = form.data['progress']
    old_row.status = form.data['status']
    old_row.score = form.data['score']
    if old_row.status == 0:
      # plans to watch
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Plans to watch {anime["name"]["userPreferred"]}')
    if old_row.status == 1:
      # watching
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Watched episode {old_row.progress} of {anime["name"]["userPreferred"]}')
    if old_row.status == 2:
      # completed
      old_row.progress = anime['episodes']
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Completed {anime["name"]["userPreferred"]}')
    if old_row.status == 3:
      # Paused
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Paused {anime["name"]["userPreferred"]}')
    if old_row.status == 4:
      # Dropped
      feed_update = Feed(user_id=current_user.id, anime_id=form.data['animeid'], content=f'Dropped {anime["name"]["userPreferred"]}')
    db.session.add(feed_update)
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
