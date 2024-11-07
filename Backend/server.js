const express = require("express")
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = 8080

app.use(cors())

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



app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})