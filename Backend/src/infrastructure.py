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
uri=f"mongodb+srv://steamwrapped_admin:{MONGO_PWD}@steamwrapped.re39x.mongodb.net/?retryWrites=true&w=majority&appName=steamwrapped"
client=MongoClient(uri,server_api=ServerApi('1'))
db_mongo=client['steamwrapped']

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
@app.route("/get-tasks/<user_id>")
def get_tasks(user_id):
    #note: placeholder function. 
    #TODO: confirm correctness
    #TODO: confirm function returns required data
    #note: right now, this function queries mongodb for the document containing the tasks for a player, and then returns the whole document
    return jsonify(db_mongo['task_list'].find_one({"playerId": f"{user_id}"})), 200

#high level interface, queries mongodb to see if user exists
#note: not sure if this makes sense, but I thought to send the playerId back to the frontend server so that the frontend knows which playerId to query for games, achievements, tasks etc.
@app.route("/attempt-login/<user_login>")
def attempt_login(user_login):
    #note: placeholder function. 
    #TODO: confirm correctness
    #TODO: confirm function returns required data
    user=db_mongo['user_list'].find_one({"user_login": f"{user_login}"})
    if(user):
        return jsonify(user["playerId"]), 200
    else:
        return jsonify("ERROR: User Not Found"),500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
    db_mongo=client['task_list']

