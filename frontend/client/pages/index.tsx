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
   <div className = "bg-slate-700 h-full text-white">
    <div className="row"> 
      <div className = "flex flex-row">
      <div>
        <label>User ID: </label>
        <input
          type="text"
          value={playerId}
          onChange={handlePlayerChange}
          className="rounded px-2 py-1 my-2 text-black"
        />
      </div>

      <div>
        <label>Game ID: </label>
        <input
          type="text"
          value={gameId}
          onChange={handleGameChange}
          className="rounded px-2 py-1 my-2 text-black"
        />
      </div>
      <button 
        onClick={submitToBackEnd}
        className="bg-blue-500 text-white rounded px-4 py-2 my-1 ml-2"
        > 
        Submit </button> 
      </div>

      <div>
        <p>Input One: {playerId}</p>
        <p>Input Two: {gameId}</p>
        <p> Response: {Array.isArray(responseMessage) && responseMessage.filter(achievement => achievement.achieved === 0).map((achievement: any, index: number)=> (
          <div key={index} className="bg-slate-900 p-4 rounded-lg shadow-md my-2 mx-56">
          <p className="font-bold">{achievement.name}</p>
          <p>Description: {achievement.description}</p>
          <p>Achieved: {achievement.achieved ? "Yes" : "No"}</p>
          <p>Unlock Time: {achievement.unlocktime}</p>
      </div>
        ))} </p>
      </div>
      </div>
    </div>
  </>
  );
}
