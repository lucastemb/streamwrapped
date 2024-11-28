import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  task: any
  deleteTask: any
}

export default function AchievementTile({task, deleteTask}: TaskProps) {
    const diffInDays = (timeAchieved: number) => {
        const currDate: Date = new Date();
        const taskDate: Date = new Date(timeAchieved * 1000)

        const diffInMs = currDate.getTime() - taskDate.getTime();
        const daysDiff = Math.floor(diffInMs / (1000 * 60 * 60 *24))
        return daysDiff
    }
    return (
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
                <p className="text-sm text-gray-300">Time Elapsed: {Math.floor(((Date.now()) - task.time*1000)/ (1000 * 60 * 60 * 24))} days</p>
            </div>
            </div>

            {/* Achievement Section */}
            <div className="bg-gray-700 text-white rounded-lg p-4 mb-4">
            <p className="font-semibold text-lg">{task.achievement ? task.achievement.name : "Loading..."}</p>
            <p className="text-gray-300">{task.achievement ? task.achievement.description : "Loading..."}</p>
            <p className="text-gray-300">{task.timeAchieved ? (`Completed on ${new Date(task.timeAchieved * 1000).toLocaleDateString("en-US")} (${diffInDays(task.timeAchieved)} days ago)`) : "Incomplete"}</p>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-between space-x-4">
            <button className="bg-red-500 text-white rounded px-4 py-2 flex items-center h-12"
                onClick={() => deleteTask(task._id)}>
                Delete
            </button>
            </div>
        </div>
    );
}
