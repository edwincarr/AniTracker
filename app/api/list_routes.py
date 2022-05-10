from flask import Blueprint, jsonify, request

from flask_login import login_required

list_routes = Blueprint('lists', __name__)

# @list_routes.routes('/')
# def getUserList():
#     response = request.get('https://api.jikan.moe/v4/anime/0')
#     print(response)
