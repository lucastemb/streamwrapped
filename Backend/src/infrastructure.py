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

#Setup MongoDB conn
MONGO_PWD=os.getenv("MONGO_PASSWORD")
uri=f"mongodb+srv://steamwrapped_admin:{MONGO_PWD}@tasks.re39x.mongodb.net/?retryWrites=true&w=majority&appName=tasks"
client=MongoClient(uri,server_api=ServerApi('1'))


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
    
#high level interface, gets mongodb task data for a user
@app.route("/get-tasks/<user_name>")
def get_game_achievements(user_id, app_id):
    #note: placeholder function. 
    #TODO: confirm correctness
    #TODO: confirm function returns required data
    return jsonify(client['task_list'][user_name].find(), 200      

if __name__ == "__main__":
    app.run(port=8000, debug=True)
    db_mongo=client['task_list']

