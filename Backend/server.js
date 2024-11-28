const express = require("express")
const axios = require('axios')
const cors = require('cors')
require('dotenv').config();

const app = express()
const PORT = 8080

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://steamwrapped_admin:${process.env.MONGO_PWD}@steamwrapped.re39x.mongodb.net/?retryWrites=true&w=majority&appName=steamwrapped`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error.message);
      process.exit(1); // Exit if connection fails
    }
  }
  
  // Call this at app startup
connectToDatabase();

app.use(express.json());
app.use(cors())

//get achievements
app.get("/get-data/:playerId/:gameId", async (req, res)=> {
    const {playerId, gameId} = req.params
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get-achievements/${playerId}/${gameId}`)
        res.json(response.data)
    } catch(error){
        console.error('Error pinging Flask endpoint:', error.message);
    }
});

//get games
app.get("/get-games/:playerId", async (req, res) => {
    const { playerId } = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get-games/${playerId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.get("/search-user/:profileId", async (req, res) => {
    const { profileId } = req.params;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/search-user/${profileId}`);
      console.log("User data from Flask:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching user data from Flask:", error.message);
      res.status(500).send("Error fetching user data from Flask");
    }
  });

//login attempt
//NOTE: this is a PLACEHOLDER
app.get("/exists-user/:email", async (req, res) => {
        const { email } = req.params
        try {
          //get db 
          const database = client.db("steamwrapped");
          //users
          const users = database.collection("users");
          const query = { email: email };
          const user = await users.findOne(query);
          if (!user) {
           return res.json({exists: false, message: "Email not found"});
          }
          return res.json({exists:true, user});
        } catch(error) {
            return res.json({error: "Internal server error"});
        }
});

app.get("/get-tasks", async (req, res) => {
    const { steamId } = req.query
    try {
      const database = client.db("steamwrapped");
      const users = database.collection("tasks");
      const query = { user: steamId };
      const tasks = await users.find(query).toArray();
      return res.json({tasks});
    } catch(error) {
        return res.json({error: "Internal server error"});
    }
});

app.post("/add-user/:email/:steamID/:steamURL", async (req, res) => {
    const { email, steamID, steamURL } = req.params;
    try {
        //get db 
        const database = client.db("steamwrapped");
        //users
        const users = database.collection("users");
        const document = { email: email, steamID: steamID, steamURL: steamURL };
        const result = await users.insertOne(document);
        return res.status(201).json({ message: "User added successfully", user: document });
    }
    catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

app.post("/add-task", async (req, res)=> {
    console.log(req.body)
    const {steamId, game, achievement} = req.body;
    try {
        //get db 
        const database = client.db("steamwrapped");
        //users
        const tasks = database.collection("tasks");
        const document = { user: steamId, game: game, achievement: achievement, time: Date.now()/ 1000};
        const result = await tasks.insertOne(document);
        return res.status(201).json({ message: "User added successfully", user: document });
    }
    catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }

})

app.delete("/delete-task", async (req, res)=> {
    console.log(req.query)
    const { taskId } = req.query;
    try {
        //get db 
        console.log("data")
        const database = client.db("steamwrapped");
        //users
        const tasks = database.collection("tasks");
        const result = await tasks.deleteOne({ _id: new ObjectId(taskId) });
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }

});


app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})