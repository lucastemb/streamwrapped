import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  steamId: string
  steamUrl: string
  setSubmitted: Dispatch<SetStateAction<boolean>>
  submitted: boolean
}

export default function Task({steamId, steamUrl, setSubmitted, submitted }: TaskProps) {
  const [gameId, setGameId] = useState("")
  const [responseMessage, setResponseMessage] = useState<any[]>([]);
  const [gameInfo, setGameInfo] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [achievementDropdown, setAchievementDropdownOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
 

  useEffect(()=> {
    const fetchGames = async () => {
      try {
        if(steamId){
        const gameResponse = await axios.get(`http://localhost:8080/get-games/${steamId}`);
        // Sort games alphabetically
        const sortedGames = gameResponse.data.games.sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setGameInfo(sortedGames);
      }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames()
  }, [steamId])


  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setGameId(game.appid.toString());
    setDropdownOpen(false);
    fetchAchievements(game.appid.toString());
  };

  const addTask = async (game: any, achievement: any) => {
    const response = await axios.post('http://127.0.0.1:8080/add-task/', {
      steamId,
      game,
      achievement
    });
    if (response.status === 201) {
      setSubmitted(!submitted);
      setSelectedGame(null);
      setSelectedAchievement(null);
      setResponseMessage([]);
    
    }
  }
  const handleAchievementSelect = (achievement: any) => {
    setSelectedAchievement(achievement);
    setAchievementDropdownOpen(false)
  }
  
  const fetchAchievements = async (selectedGameId: string) => {
    if (!selectedGameId) return;
  
    try {
      const response = await axios.get(`http://localhost:8080/get-data/${steamId}/${selectedGameId}`);
      setResponseMessage(response.data.playerstats.achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  return (
    <>
    <div className="flex flex-col justify-center px-2 py-2 m-2 bg-gradient-to-b from-blue-800 to-slate-900 rounded-md">
      {/* Achievement Goal Title */}
      <h1 className="text-lg font-bold text-center mb-2 border-b-2 border-white">Achievement Goal</h1>
      {/* Game and Achievment Row */}
      <div className="flex flex-row justify-between items-start gap-1 bg-slate-800 px-2 py-2 rounded-md">
        {/* Game Dropdown */}
        {gameInfo.length > 0 && (
          <div className="mb-1 flex flex-col">
            <label className="font-semibold">Game: </label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-600 hover:bg-blue-700 duration-100 text-white rounded px-4 py-2 flex items-center"
            >
              {selectedGame ? (
                <>
                  <img
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${selectedGame.appid}/${selectedGame.img_icon_url}.jpg`}
                    alt={selectedGame.name}
                    className="w-6 h-6 mr-2"
                  />
                  {selectedGame.name}
                </>
              ) : (
                "Select a Game"
              )}
            </button>

            {dropdownOpen && (
              <ul className="bg-zinc-700 text-white rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto w-64 border border-gray-500">
                {gameInfo.map((game: any) => (
                  <li
                    key={game.appid}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => handleGameSelect(game)}
                  >
                    <img
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                      alt={game.name}
                      className="w-6 h-6 mr-2 rounded-md"
                    />
                    {game.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Achievements */}
        {responseMessage ? (responseMessage?.length > 0 ? (
          
          <div className="flex flex-col">
            <div className="flex flex-col">
            <label className="font-semibold">Achievement: </label>
            <button
              onClick={() => setAchievementDropdownOpen(!achievementDropdown)}
              className="bg-blue-600 hover:bg-blue-700 duration-100 text-white rounded px-4 py-2 flex items-center"
            >
              {selectedAchievement ? (
                <>
                  {selectedAchievement.name}
                </>
              ) : (
                "Select an Achievement"
              )}
            </button>
            </div>
            
            {achievementDropdown && (<ul className="bg-zinc-700 text-white rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto w-64 border border-gray-500"> 
            {responseMessage
              .filter((achievement) => achievement.achieved === 0)
              .map((achievement: any, index: number) => (
                
                <li
                  key={index}
                  className="flex flex-col text-center items-center px-4 py-2 cursor-pointer hover:bg-blue-600 duration-200"
                  onClick={()=> handleAchievementSelect(achievement)}
                >
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
                </li>
              ))}
              </ul>
            )}
          </div>
        ) : <div className="flex flex-col">
        <label className="font-semibold">Achievement: </label>
        <div
          className="bg-blue-600 text-white text-center rounded px-4 py-2 flex items-center"
        >
        No locked achievements found
        </div>
        </div>) : 
        (<div className="flex flex-col">
          <label className="font-semibold">Achievement: </label>
          <div
            className="bg-blue-600 text-white text-center rounded px-4 py-2 flex items-center"
          >
          No locked achievements found
          </div>
          </div>)}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
        <button className="bg-green-500 text-white rounded px-4 flex items-center h-12 hover:bg-green-600 duration-100 my-1" onClick={()=>addTask(selectedGame, selectedAchievement)}>
          Submit
        </button>
        </div>
      </div>
    </>
  );
}
