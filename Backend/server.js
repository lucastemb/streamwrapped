const express = require("express")
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = 8080

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
app.get("/attempt-login/:user_login", async (req, res) => {
    const { user_login } = req.params;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/attempt-login/${user_login}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
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