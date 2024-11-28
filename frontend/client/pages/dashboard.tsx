import Image from "next/image";
import localFont from "next/font/local";
import Task from "../components/task";
import { useState, useEffect } from "react";
import axios from "axios";
import { throwIfDisallowedDynamic } from "next/dist/server/app-render/dynamic-rendering";

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
  const [submitted, setSubmitted] = useState<boolean | undefined>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

    // Extract profileId from the steamUrl
    const extractProfileId = (url: string): string | null => {
      try {
        const parts = url.split("/");
        return parts[parts.length - 2] || null; // Get the second-to-last part
      } catch (err) {
        console.error("Error extracting profileId from URL:", err);
        return null;
      }
    };
  
    // Get profileId from the provided steamUrl
    const profileId = extractProfileId(steamUrl);

  useEffect(() => {
    const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/get-tasks", {
      params: { steamId } 
    })
    setTasks(response.data.tasks)
    }
    fetchTasks();
  }, [steamId, submitted])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/search-user/${profileId}`);
        console.log("User Profile:", response.data);
        setUserProfile(response.data.player);

        //console.log("Avatar Hash:", response.data.player.avatarhash);
        //console.log("Persona Name:", response.data.player.personaname);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [profileId]);

  const deleteTask = async (taskId: string) => {
    const response = await axios.delete("http://127.0.0.1:8080/delete-task", {
      params: { taskId },
    });

    if (response.status === 200) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    }
  };

  return (
    <>
      {/* Background */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/websitebackground.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-slate-700/70 min-h-screen text-white p-4">
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
            {/* Profile Pic and Name */}
            {userProfile && (
              <div className="absolute top-10 left-10 bg-slate-900/80 text-white rounded-lg p-4 shadow-lg flex items-center space-x-4">
                <Image
                  src={`https://avatars.steamstatic.com/${userProfile.avatarhash}_full.jpg`}
                  alt={`${userProfile.personaname} Profile Pic`}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <p className="text-lg font-semibold">{userProfile.personaname}</p>
              </div>
            )}
          </div>
  
          {tasks && tasks.map((task: any) => (
            <div className="bg-slate-800/80 text-white rounded-lg mb-4 p-4 w-3/4 max-w-2xl mx-auto drop-shadow-lg">
              {/* Game Section */}
              <div className="bg-blue-900 text-white rounded-lg p-4 mb-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Image
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${task.game.appid}/${task.game.img_icon_url}.jpg`}
                      alt={task.game ? task.game.name : "Game"}
                      width={40}
                      height={40}
                      className="mr-2 rounded-md"
                    />
                    <h1 className="font-bold">{task.game ? task.game.name : "Loading..."}</h1>
                  </div>
                  <p className="text-sm text-gray-300">Time Elapsed: {(Date.now() / 1000) - task.time}</p>
                </div>
              </div>

              {/* Achievement Section */}
              <div className="bg-gray-700 text-white rounded-lg p-4 mb-4">
                <p className="font-semibold text-lg">{task.achievement ? task.achievement.name : "Loading..."}</p>
                <p className="text-gray-300">{task.achievement ? task.achievement.description : "Loading..."}</p>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-between space-x-4">
                <button className="bg-green-500 text-white rounded px-4 py-2 flex items-center h-12">
                  Refresh
                </button>
                <button className="bg-red-500 text-white rounded px-4 py-2 flex items-center h-12"
                  onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <Task setSubmitted={setSubmitted} steamId={steamId} steamUrl={steamUrl} />
        </div>
      </div>
    </>
  );
}
