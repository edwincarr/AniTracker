from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import User

class ListForm(FlaskForm):
  status = IntegerField('status', validators=[DataRequired()])
  score = IntegerField('score')
  progress = IntegerField('progress', validators=[DataRequired()])
