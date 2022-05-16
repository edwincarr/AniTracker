from flask_wtf import FlaskForm
from wtforms import IntegerField
from app.models import User

class ListForm(FlaskForm):
  status = IntegerField('status')
  score = IntegerField('score')
  progress = IntegerField('progress')
  animeid = IntegerField('animeid')
