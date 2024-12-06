from flask import Flask, request, jsonify
import os
from steam_web_api import Steam
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests as python_requests

# Load environment variables
load_dotenv()

# Setup Steam API connection
STEAM_API_KEY = os.getenv("STEAM_API_KEY")
steam = Steam(STEAM_API_KEY)

app = Flask(__name__)

# Utility functions
def error_response(message, code=400):
    """Returns a standardized error response."""
    return jsonify({"error": message}), code

def is_valid_steam_url(url):
    """Validates if the given URL is a Steam profile URL."""
    if url.startswith("https://steamcommunity.com/id/") or url.startswith("steamcommunity.com/id/"):
        return True
    return False

def fetch_url(url):
    """Fetches the provided URL and checks its availability."""
    if not url.startswith("https://"):
        url = "https://" + url
    response = python_requests.get(url)
    return response.status_code < 400

# API Routes
@app.route("/search-user/<user_id>")
def get_user(user_id):
    """Fetch user information by user ID."""
    resp = steam.users.search_user(user_id)
    if resp["player"] is None:
        return error_response("Invalid ID entered", 210)
    return jsonify(resp), 200

@app.route("/validate-user-id/<user_id>")
def validate_user(user_id):
    """Validate if a user ID corresponds to a valid Steam user."""
    resp = steam.users.get_user_details(user_id)
    if resp["player"] is None:
        return error_response("Invalid ID entered", 210)
    return jsonify(resp), 200

@app.route("/search-url", methods=["GET"])
def search_url():
    """Validate a Steam profile URL."""
    url = request.args.get("steamURL")
    if not url or not is_valid_steam_url(url):
        return error_response("Invalid URL", 210)
    if fetch_url(url):
        return jsonify({"message": "Found"}), 200
    return error_response("URL not found", 210)

@app.route("/get-games/<user_id>")
def get_games(user_id):
    """Retrieve the games owned by a Steam user."""
    return jsonify(steam.users.get_owned_games(user_id)), 200

@app.route("/get-achievements/<user_id>/<app_id>")
def get_game_achievements(user_id, app_id):
    """Fetch achievements for a specific game and user."""
    return jsonify(steam.apps.get_user_achievements(user_id, app_id)), 200

@app.route("/get-friends/<user_id>")
def get_friends(user_id):
    """Get the friends list of a Steam user."""
    return jsonify(steam.users.get_user_friends_list(user_id)), 200

@app.route("/get-level/<user_id>")
def get_level(user_id):
    """Fetch the Steam level of a user."""
    return jsonify(steam.users.get_user_steam_level(user_id)), 200

# Main entry point
if __name__ == "__main__":
    app.run(port=8000, debug=True)
