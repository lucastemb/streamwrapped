const express = require("express")
const axios = require('axios')
const cors = require('cors')
require('dotenv').config();

const app = express()
const PORT = 8080

const { MongoClient, ServerApiVersion } = require('mongodb');
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


app.use(cors())
//TODO: Consider condensing below functions using a helper function as follows:
/*
//idk imagine this was the correct syntax for javascript
void* func(String url){
    try {
        const response = await axios.get(url)
        res.json(response.data)
    } catch(error){
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
    return res;
}
*/

//get achievements
app.get("/get-data/:playerId/:gameId", async (req, res)=> {
    const {playerId, gameId} = req.params
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get-achievements/${playerId}/${gameId}`)
        res.json(response.data)
    } catch(error){
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
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

//tasks page
//TODO: please confirm correctness of this call
app.get("/get-tasks/:playerId", async (req, res) => {
    const { playerId } = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get-tasks/${playerId}`);
        res.json(response.data);

    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.get("/add-task/:playerId/:taskId/:taskData", async (req, res) => {
    const { playerId, taskId, taskData} = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/add-task/${playerId}/${taskID}/${taskData}`);
        res.json(response.data);

    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.get("/set-task/:playerId/:taskId/:taskData", async (req, res) => {
    const { playerId, taskId, taskData} = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/set-task/${playerId}/${taskID}/${taskData}`);
        res.json(response.data);

    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.get("/delete-task/:playerId/:taskId", async (req, res) => {
    const { playerId, taskId} = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/delete-task/${playerId}/${taskID}`);
        res.json(response.data);

    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})