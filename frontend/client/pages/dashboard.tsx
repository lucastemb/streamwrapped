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

interface DashboardProps {
  email: string
  steamId: string
  steamUrl: string


}
export default function Dashboard({email, steamId, steamUrl}: DashboardProps) {
  const [playerId, setPlayerId] = useState("")
  const [gameId, setGameId] = useState("")
  const [responseMessage, setResponseMessage] = useState<any[]>([]);
  const [gameInfo, setGameInfo] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const handlePlayerChange = (e: any) => {
    setPlayerId(e.target.value)
  }

  useEffect(()=> {
    const fetchGames = async () => {
      try {
        console.log(steamId)
        const gameResponse = await axios.get(`http://localhost:8080/get-games/${steamId}`);
        setGameInfo(gameResponse.data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames()
  }, [steamId])

  /*
  const handleGameChange = (e: any) => {
    setGameId(e.target.value)
  }

  const submitToBackEnd =  async () => {
    console.log(`Player ID: ${playerId}, Game ID: ${gameId}`);
    try {
      const response = await axios.get(`http://localhost:8080/get-data/${playerId}/${gameId}`)
      console.log(response.data.playerstats.achievements)
      setResponseMessage(response.data.playerstats.achievements)

      const gameResponse = await axios.get(`http://localhost:8080/get-games/${playerId}`);
      console.log(gameResponse.data.games);
      setGameInfo(gameResponse.data.games);
    }
    catch (error) {
      console.error('Error sending data to backend:', error);
    }
  }
  */


  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setGameId(game.appid.toString());
    setDropdownOpen(false);
    fetchAchievements(game.appid.toString());
  };
  
  const fetchAchievements = async (selectedGameId: string) => {
    if (!selectedGameId) return;
  
    try {
      const response = await axios.get(`http://localhost:8080/get-data/${steamId}/${selectedGameId}`);
      console.log(response.data.playerstats.achievements);
      setResponseMessage(response.data.playerstats.achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(()=>{
    console.log(responseMessage)
  }, [responseMessage])

  /*
  const getGameInfoId = (gameId: number) => {
    const game = gameInfo.find((game) => game.appid === gameId);
    return game;
  };
  */

  return (
    <>
      <div className="bg-slate-700 min-h-screen text-white p-4">
        {/* Title */}
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/images/Steam_icon_logo.png"
            alt="Steam Logo"
            width={70}
            height={70}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold">Steam Wrapped</h1>
        </div>

        {/* User ID */}
        

        {/* Game Dropdown */}
        {gameInfo.length > 0 && (
          <div className="relative mb-4">
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
              <ul className="absolute bg-white text-black rounded shadow-md mt-2 max-h-60 overflow-y-auto w-64">
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
          <div>
            <p className="text-center text-lg font-bold">Achievements</p>
            {responseMessage
              .filter((achievement) => achievement.achieved === 0)
              .map((achievement: any, index: number) => (
                <div
                  key={index}
                  className="bg-slate-900 p-4 rounded-lg shadow-md my-2"
                >
                  <p className="font-bold">{achievement.name}</p>
                  <p>Description: {achievement.description}</p>
                  <p>Achieved: {achievement.achieved ? "Yes" : "No"}</p>
                  <p>Unlock Time: {achievement.unlocktime}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
