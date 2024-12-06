const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = 8080;

// MongoDB URI and Client setup
const uri = `mongodb+srv://steamwrapped_admin:${process.env.MONGO_PWD}@steamwrapped.re39x.mongodb.net/?retryWrites=true&w=majority&appName=steamwrapped`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit if connection fails
  }
}

// Initialize MongoDB connection
connectToDatabase();

app.use(express.json());
app.use(cors());

// Helper function to handle axios requests and responses
const fetchDataFromFlask = async (url, res) => {
  try {
    const response = await axios.get(url);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error fetching data from Flask: ${error.message}`);
    res.status(500).send("Error fetching data from Flask");
  }
};

// API Routes
app.get("/get-data/:playerId/:gameId", (req, res) => {
  const { playerId, gameId } = req.params;
  fetchDataFromFlask(`http://127.0.0.1:8000/get-achievements/${playerId}/${gameId}`, res);
});

app.get("/get-games/:playerId", (req, res) => {
  const { playerId } = req.params;
  fetchDataFromFlask(`http://127.0.0.1:8000/get-games/${playerId}`, res);
});

app.get("/search-user/:profileId", (req, res) => {
  const { profileId } = req.params;
  fetchDataFromFlask(`http://127.0.0.1:8000/search-user/${profileId}`, res);
});

app.get("/validate-user-id/:userId", (req, res) => {
  const { userId } = req.params;
  fetchDataFromFlask(`http://127.0.0.1:8000/validate-user-id/${userId}`, res);
});

app.get("/search-url", async (req, res) => {
  const { steamURL } = req.query;
  if (!steamURL) {
    return res.status(400).send("Steam URL is required");
  }
  fetchDataFromFlask(`http://127.0.0.1:8000/search-url?steamURL=${steamURL}`, res);
});

app.get("/get-level", (req, res) => {
  const { steamId } = req.query;
  fetchDataFromFlask(`http://127.0.0.1:8000/get-level/${steamId}`, res);
});

app.get("/exists-user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const database = client.db("steamwrapped");
    const users = database.collection("users");
    const query = { email: email };
    const user = await users.findOne(query);
    if (!user) {
      return res.json({ exists: false, message: "Email not found" });
    }
    return res.json({ exists: true, user });
  } catch (error) {
    console.error("Error checking user existence:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get-tasks", async (req, res) => {
  const { steamId } = req.query;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    const query = { user: steamId };
    const taskList = await tasks.find(query).toArray();
    return res.json({ tasks: taskList });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get-friends", (req, res) => {
  const { steamId } = req.query;
  fetchDataFromFlask(`http://127.0.0.1:8000/get-friends/${steamId}`, res);
});

// Add Completion to Task
app.patch("/add-completion", async (req, res) => {
  const { taskId } = req.body;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    const task = await tasks.findOne({ _id: new ObjectId(taskId) });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const hasAttribute = task.hasOwnProperty("timeAchieved");
    if (!hasAttribute) {
      await tasks.updateOne({ _id: new ObjectId(taskId) }, { $set: { timeAchieved: Date.now() / 1000 } });
      return res.status(200).json({ message: "Completion status updated successfully" });
    }

    return res.status(200).json({ message: "Already complete" });
  } catch (error) {
    console.error("Error updating task completion:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add User to Database
app.post("/add-user/:email/:steamID/:steamURL", async (req, res) => {
  const { email, steamID, steamURL } = req.params;
  try {
    const database = client.db("steamwrapped");
    const users = database.collection("users");
    const document = { email, steamID, steamURL };
    await users.insertOne(document);
    return res.status(201).json({ message: "User added successfully", user: document });
  } catch (error) {
    console.error("Error adding user:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add Task to Database
app.post("/add-task", async (req, res) => {
  const { steamId, game, achievement } = req.body;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    const document = { user: steamId, game, achievement, time: Date.now() / 1000, type: 1 };
    await tasks.insertOne(document);
    return res.status(201).json({ message: "Task added successfully", user: document });
  } catch (error) {
    console.error("Error adding task:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add Friend Task to Database
app.post("/add-friend-task", async (req, res) => {
  const { steamId, friendCount } = req.body;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    const document = { user: steamId, desiredFriendCount: friendCount, type: 2 };
    await tasks.insertOne(document);
    return res.status(201).json({ message: "Friend task added successfully", user: document });
  } catch (error) {
    console.error("Error adding friend task:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add Level Task to Database
app.post("/add-level-task", async (req, res) => {
  const { steamId, wantedLevel } = req.body;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    const document = { user: steamId, level: wantedLevel, type: 3 };
    await tasks.insertOne(document);
    return res.status(201).json({ message: "Level task added successfully", user: document });
  } catch (error) {
    console.error("Error adding level task:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Task from Database
app.delete("/delete-task", async (req, res) => {
  const { taskId } = req.query;
  try {
    const database = client.db("steamwrapped");
    const tasks = database.collection("tasks");
    await tasks.deleteOne({ _id: new ObjectId(taskId) });
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});