from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
  anime_id = IntegerField('anime_id')
  content = StringField('content', validators=[DataRequired(), Length(min=2, max=1000)])
