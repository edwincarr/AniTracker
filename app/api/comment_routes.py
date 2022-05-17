from flask import Blueprint, request
import requests
from app.forms.comment_form import CommentForm
from app.models import User, db, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/<int:animeid>')
def getting_comments(animeid):
  comments = Comment.query.filter(Comment.anime_id == animeid).order_by(Comment.created_at.desc()).all()
  print(comments)
  return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=['POST'])
def posting_comment():
  form = CommentForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_comment = Comment(anime_id=form.data['anime_id'], poster_id=current_user.id, content=form.data['content'])
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
