from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class SearchForm(FlaskForm):
  search = StringField('search', validators=[DataRequired(), Length(min=2, max=50)])
