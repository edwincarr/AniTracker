from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='Username is Required'), username_exists])
    email = EmailField('email', validators=[DataRequired(message='Email is Required'),Email(), user_exists])
    password = PasswordField('password', validators=[DataRequired(message='Password is Required'), EqualTo('confirm',  message='Passwords must match')])
    confirm = PasswordField('confirm', validators=[EqualTo('password', message='Passwords must match')])
