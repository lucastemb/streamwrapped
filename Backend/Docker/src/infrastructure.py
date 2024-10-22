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

if __name__ == "__main__":
    app.run(debug=True)