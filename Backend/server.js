const express = require("express")
const axios = require('axios')

const app = express()
const PORT = 8080

app.get("/get-data", async (req, res)=> {
    try {
        const response = await axios.get('http://127.0.0.1:8000/get-achievements/76561198109081792/413150')
        res.json(response.data)
    } catch(error){
        console.error('Error pinging Flask endpoint:', error.message);
        res.status(500).send('Error pinging Flask server');
    }
});

app.listen(PORT, ()=> {
    console.log(`Server statred on port ${PORT}`)
})