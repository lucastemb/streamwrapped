import Image from "next/image";
import localFont from "next/font/local";
import { useState, useEffect } from "react";
import axios from "axios";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const [playerId, setPlayerId] = useState("")
  const [gameId, setGameId] = useState("")
  const [responseMessage, setResponseMessage] = useState("")

  const handlePlayerChange = (e: any) => {
    setPlayerId(e.target.value)
  }

  const handleGameChange = (e: any) => {
    setGameId(e.target.value)
  }

  const submitToBackEnd =  async () => {
    console.log(`Player ID: ${playerId}, Game ID: ${gameId}`);
    try {
      const response = await axios.get(`http://localhost:8080/get-data/${playerId}/${gameId}`)
      console.log(response.data.playerstats.achievements)
      setResponseMessage(response.data.playerstats.achievements)
    }
    catch (error) {
      console.error('Error sending data to backend:', error);
    }
  }

  useEffect(()=>{
    console.log(responseMessage)
  }, [responseMessage])

  return (
  <>
   <div>
    <div className="row"> 
      <div className = "flex flex-row">
      <div>
        <label>Input One:</label>
        <input
          type="text"
          value={playerId}
          onChange={handlePlayerChange}
        />
      </div>

      <div>
        <label>Input Two:</label>
        <input
          type="text"
          value={gameId}
          onChange={handleGameChange}
        />
      </div>
      <button onClick={submitToBackEnd}> Submit </button> 
      </div>

      <div>
        <p>Input One: {playerId}</p>
        <p>Input Two: {gameId}</p>
        <p> Response: {Array.isArray(responseMessage) && responseMessage.filter(achievement => achievement.achieved === 0).map((achievement: any, index: number)=> (
          <div key={index}>
          <p>Name: {achievement.name}</p>
          <p>Description: {achievement.description}</p>
          <p>Achieved: {achievement.achieved ? "Yes" : "No"}</p>
          <p>Unlock Time: {achievement.unlocktime}</p>
          <hr />
      </div>
        ))} </p>
      </div>
      </div>
    </div>
  </>
  );
}
