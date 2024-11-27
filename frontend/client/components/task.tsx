import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  steamId: string
  steamUrl: string
  setSubmitted: Dispatch<SetStateAction<boolean | undefined>>
}

export default function Task({steamId, steamUrl, setSubmitted }: TaskProps) {
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
      setSubmitted(true);
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
    <div className="flex flex-row justify-center">
        {/* Game Dropdown */}
        {gameInfo.length > 0 && (
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">Game: </label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-500 text-white rounded px-4 py-2 flex items-center"
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
              <ul className="flex flex-col bg-white text-black rounded shadow-md mt-2 max-h-60 overflow-y-auto w-64">
                {gameInfo.map((game: any) => (
                  <li
                    key={game.appid}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleGameSelect(game)}
                  >
                    <img
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                      alt={game.name}
                      className="w-6 h-6 mr-2"
                    />
                    {game.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Achievements */}
        {responseMessage.length > 0 && (
          
          <div className="flex flex-col">
            <div className="flex flex-col">
            <label className="font-semibold">Achievement: </label>
            <button
              onClick={() => setAchievementDropdownOpen(!achievementDropdown)}
              className="bg-blue-500 text-white rounded px-4 py-2 flex items-center"
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
            
            {achievementDropdown && (<ul className="flex flex-col bg-white text-black rounded shadow-md mt-2 max-h-60 overflow-y-auto w-64"> 
            {responseMessage
              .filter((achievement) => achievement.achieved === 0)
              .map((achievement: any, index: number) => (
                
                <li
                  key={index}
                  className="flex flex-col text-center items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={()=> handleAchievementSelect(achievement)}
                >
                  <p className="font-bold">{achievement.name}</p>
                  <p>{achievement.description}</p>
                </li>
              ))}
              </ul>
            )}
          </div>
        )}
        <div className="flex justify-center items-center">
        <button className="bg-green-600 text-white rounded px-4 flex items-center h-12" onClick={()=>addTask(selectedGame, selectedAchievement)}>
          Submit
        </button>
        </div>
      </div>
    </>
  );
}
