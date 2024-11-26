import Image from "next/image";
import localFont from "next/font/local";
import Task from "../components/task";
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
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/get-tasks", {
      params: { steamId } 
    })
    setTasks(response.data.tasks)
    }
    fetchTasks();
  }, [tasks])

  const deleteTask = async (taskId: string) => {
    console.log("Deleting task with ID:", taskId);
    const response = await axios.delete("http://127.0.0.1:8080/delete-task", {
      params: { taskId },
    });

    if (response.status === 200) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    }
  };

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
        {tasks && tasks.map((task: any)=> (
          <div className="bg-sky-700 text-white rounded flex flex-row justify-around items-center">
          <div>
          <h1 className="font-bold"> {task.game.name} </h1>
          </div>
          <div>
          <p> {task.achievement.name} </p> 
          <p> {task.achievement.description} </p> 
          </div>
          <div>
          <div className="flex justify-center flex-col items-center">
            <button className="bg-yellow-500 text-white rounded px-4 flex items-center h-12">
              Edit
            </button>
            <button className="bg-red-500 text-white rounded px-4 flex items-center h-12"
              onClick={() => deleteTask(task._id)}>
              Delete
            </button>
        </div>
          </div>
          </div>
        ))}
        <Task submitted={false} steamId={steamId} steamUrl={steamUrl}/>
      </div>
    </>
  );
}
