from flask_wtf import FlaskForm
from wtforms import IntegerField

class ListForm(FlaskForm):
  status = IntegerField('status')
  score = IntegerField('score')
  progress = IntegerField('progress')
  animeid = IntegerField('animeid')
