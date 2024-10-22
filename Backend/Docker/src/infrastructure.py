from flask import Flask, request, jsonify
import os
from steam_web_api import Steam
from dotenv import load_dotenv

load_dotenv()
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
    res = steam.apps.get_user_achievements(user_id, app_id)
    unachieved = []
    for achievement in res["playerstats"]["achievements"]:
        if achievement["achieved"] == 0: 
                unachieved.append(achievement)
    return jsonify(unachieved), 200
    
            

if __name__ == "__main__":
    app.run(port=8000, debug=True)