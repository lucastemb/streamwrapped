from flask import Flask, request, jsonify
import os
from steam_web_api import Steam
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
#setup Steam API conn
KEY=os.getenv("STEAM_API_KEY")
steam=Steam(KEY)

app = Flask(__name__)

#get user information
@app.route("/search-user/<user_id>")
def get_user(user_id):
	return jsonify(steam.users.search_user(user_id)), 200

@app.route("/get-games/<user_id>")
def get_games(user_id):
      return jsonify(steam.users.get_owned_games(user_id)), 200

@app.route("/get-achievements/<user_id>/<app_id>")
def get_game_achievements(user_id, app_id):
    return jsonify(steam.apps.get_user_achievements(user_id, app_id)), 200

@app.route("/get-friends/<user_id>")
def get_friends(user_id):
    return jsonify(steam.users.get_user_friends_list(user_id)), 200

@app.route("/get-level/<user_id>")
def get_level(user_id):
    return jsonify(steam.users.get_user_steam_level(user_id)), 200

if __name__ == "__main__":
    app.run(port=8000, debug=True)

