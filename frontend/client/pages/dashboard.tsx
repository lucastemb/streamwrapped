import Image from "next/image"; 
import localFont from "next/font/local"; 
import Task from "../components/task"; 
import FriendTask from "../components/friendtask"; 
import { useState, useEffect, use } from "react"; 
import axios from "axios"; 
import AchievementTile from "@/components/achievementtile"; 
import { throwIfDisallowedDynamic } from "next/dist/server/app-render/dynamic-rendering"; 
import FriendTile from "@/components/friendtile"; 
import LevelTask from "@/components/leveltask"; 
import LevelTile from "@/components/leveltile"; 

// Configure local fonts for the application
const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900", }); 
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900", }); 

// Define the props interface for the Dashboard component
interface DashboardProps { 
  email: string 
  steamId: string 
  steamUrl: string 
} 

export default function Dashboard({email, steamId, steamUrl}: DashboardProps) { 
  // State management for various dashboard functionalities
  const [submitted, setSubmitted] = useState<boolean>(false); // Track task submission
  const [tasks, setTasks] = useState<any[]>([]); // Store user tasks
  const [userProfile, setUserProfile] = useState<any>(null); // Store user profile information
  const [updated, setUpdated] = useState<boolean | undefined>(false); // Track updates to tasks
  const [sortType, setSortType] = useState<number>(-1); // Manage task sorting
  const [isOpen, setIsOpen] = useState(false); // Dropdown state management

  // Toggle dropdown visibility
  const toggleDropdown = () => { 
    setIsOpen(!isOpen); 
  }; 

  // Extract profile ID from Steam URL
  const extractProfileId = (url: string): string | null => { 
    try { 
      const parts = url.split("/"); 
      return parts[parts.length - 2] || null; // Get the second-to-last part 
    } catch (err) { 
      console.error("Error extracting profileId from URL:", err); 
      return null; 
    } 
  }; 

  // Filter tasks based on selected sort type
  const filterTasks = (tasks: any[], sortType: number): any[] => { 
    switch (sortType) { 
      case 0: // Complete tasks
        return tasks.filter((task) => task?.timeAchieved) 
      case 1: // Incomplete tasks
        return tasks.filter((task) => !(task?.timeAchieved)) 
      case 2: // Level-based tasks
        return tasks.filter((task) => task.type === 3) 
      case 3: // Achievement-based tasks
        return tasks.filter((task) => task.type === 1) 
      case 4: // Friend-based tasks
        return tasks.filter((task) => task.type === 2) 
      default: 
        return tasks 
    } 
  }; 

  // Get profileId from the provided steamUrl
  const profileId = extractProfileId(steamUrl); 

  // Compare tasks against current Steam profile status
  const compareTasks = async () => { 
    // Process each task to check for completion
    await Promise.all(tasks.map(async (task)=> { 
      // Achievement task completion check
      if(task?.type === 1){ 
        const gameId = task.game.appid; 
        const achievementName = task.achievement.apiname; 
        const response = await axios.get(`http://localhost:8080/get-data/${steamId}/${gameId}`) 
        const achievement = response.data.playerstats.achievements.filter((achievement: any) => achievement?.apiname === achievementName) 
        if(achievement[0].achieved === 1){ 
          const taskId = task._id; 
          // Update task completion status in database
          await axios.patch('http://localhost:8080/add-completion/', { params: { taskId } }) 
        } 
      } 
      // Friend count task completion check
      else if(task?.type === 2) { 
        const friendsListResponse = await axios.get('http://localhost:8080/get-friends', {params: {steamId}}) 
        const currentFriendCount = friendsListResponse.data.friends.length; 
        if(task.desiredFriendCount <= currentFriendCount) { 
          const taskId = task._id; 
          // Update task completion status in database
          await axios.patch('http://localhost:8080/add-completion/', { taskId: taskId }) 
        } 
      } 
      // Steam level task completion check
      else if(task?.type === 3) { 
        const levelResponse = await axios.get('http://localhost:8080/get-level', {params: {steamId}}) 
        const currentLevel = levelResponse.data.player_level; 
        console.log(currentLevel); 
        if(task.level <= currentLevel) { 
          const taskId = task._id; 
          // Update task completion status in database
          await axios.patch('http://localhost:8080/add-completion/', { taskId: taskId }) 
        } 
      } 
    })) 
    // Toggle updated state to trigger re-render
    setUpdated(!updated); 
  } 

  // Fetch tasks when component mounts or updates
  useEffect(() => { 
    const fetchTasks = async () => { 
      const response = await axios.get("http://localhost:8080/get-tasks", { params: { steamId } }) 
      console.log(response.data.tasks) 
      console.log("done updated") 
      setTasks(response.data.tasks) 
    } 
    fetchTasks(); 
  },[updated, submitted]) 

  // Fetch user profile when component mounts
  useEffect(() => { 
    const fetchUserProfile = async () => { 
      try { 
        const response = await axios.get(`http://localhost:8080/search-user/${profileId}`); 
        console.log("User Profile:", response.data); 
        setUserProfile(response.data.player); 
      } catch (err) { 
        console.error("Error fetching user profile:", err); 
      } 
    }; 
    fetchUserProfile(); 
  }, [profileId]); 

  // Delete a specific task
  const deleteTask = async (taskId: string) => { 
    const response = await axios.delete("http://127.0.0.1:8080/delete-task", { params: { taskId }, }); 
    if (response.status === 200) { 
      // Remove deleted task from local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); 
    } 
  }; 

  // Render dashboard UI
  return (
    <>
      {/* Background */}
      <div
        className="min-h-screen min-w-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/websitebackground.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="bg-slate-700/70">
          <div className="min-h-screen text-white p-2 fade-in-top-to-bottom flex">
            {/* Left Panel */}
            <div className="w-auto bg-gradient-to-b from-slate-900/80 to-slate-800/80 p-6 rounded-lg shadow-lg">
              {/* Profile Section */}
              {userProfile && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4">User Info</h2>
                  <div className="bg-slate-900 flex items-center space-x-4 p-4 rounded-lg">
                    <Image
                      src={`https://avatars.steamstatic.com/${userProfile.avatarhash}_full.jpg`}
                      alt={`${userProfile.personaname} Profile Pic`}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                    <p className="text-lg font-semibold">{userProfile.personaname}</p>
                    <button
                      className="bg-slate-600 flex items-center rounded-md px-4 h-12 hover:bg-slate-700 duration-100"
                      onClick={() => window.location.reload()}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
  
              {/* Filter Section */}
              <div className="bg-slate-700/70 p-3 rounded-md flex flex-col space-y-2">
                <p className="text-lg font-semibold">Filter Tasks:</p>
                {/* Filter container */}
                <div className="bg-slate-800 p-2 rounded-md mt-2">
                  <div className="flex flex-col space-y-1">
                    {["No Sorting", "Complete", "Incomplete", "Level-Based", "Achievement-Based", "Friend-Based",].map(
                      (label, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-md text-left font-medium duration-150 ${
                          sortType === index - 1
                            ? "bg-blue-600 text-white" // Active button
                            : "text-gray-300 hover:bg-slate-700" // Normal hover
                        }`}
                        onClick={() => setSortType(index - 1)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Panel */}
            <div className="w-3/4 ml-2">
              <div className="flex flex-col items-center mb-4">
                <Image
                  src="/images/Steam_icon_logo.png"
                  alt="Steam Logo"
                  width={70}
                  height={70}
                  className="mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
                />
                <h1 className="text-3xl font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]">
                  Steam Wrapped
                </h1>
              </div>
              
              {/* Task Creation */}
              <div className="flex justify-center">
                <div className="w-fit flex flex-col justify-center px-2 py-2 m-2 bg-slate-900/70 rounded-md drop-shadow-[0_0px_10px_rgba(0,0,0,0.50)]">
                  <h1 className="text-2xl font-bold text-center mb-2">Goal Creation</h1>
                  <div className="flex flex-row justify-center gap-1">
                    <Task
                      steamId={steamId}
                      steamUrl={steamUrl}
                      setSubmitted={setSubmitted}
                      submitted={submitted}
                    />
                    <FriendTask
                      steamId={steamId}
                      steamUrl={steamUrl}
                      setSubmitted={setSubmitted}
                      submitted={submitted}
                    />
                    <LevelTask
                      steamId={steamId}
                      setSubmitted={setSubmitted}
                      submitted={submitted}
                    />
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="flex justify-center">
                <button
                  onClick={compareTasks}
                  className="bg-green-500 text-white rounded px-4 py-2 mb-2 flex items-center h-12 hover:bg-green-600 duration-100"
                >
                  Update Goals
                </button>
              </div>

              {/* Tasks */}
              <div>
                {tasks &&
                  filterTasks(tasks, sortType).map((task: any) => {
                    switch (task.type) {
                      case 1:
                        return <AchievementTile task={task} deleteTask={deleteTask} />;
                      case 2:
                        return <FriendTile task={task} deleteTask={deleteTask} />;
                      case 3:
                        return <LevelTile task={task} deleteTask={deleteTask} />;
                      default:
                        return null;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
