import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  task: any
  deleteTask: any
}

export default function FriendTile({task, deleteTask}: TaskProps) {
    const diffInDays = (timeAchieved: number) => {
        const currDate: Date = new Date();
        const taskDate: Date = new Date(timeAchieved * 1000)

        const diffInMs = currDate.getTime() - taskDate.getTime();
        const daysDiff = Math.floor(diffInMs / (1000 * 60 * 60 *24))
        return daysDiff
    }
    return (
    <div className="bg-slate-800/80 text-white rounded-lg mb-4 p-4 w-3/4 max-w-2xl mx-auto drop-shadow-lg">
            <div className="bg-blue-800 text-white rounded-lg p-4 mb-2">
            <div className="flex items-center flex-col space-x-4">
                <p className="text-sm text-white"> <span className="font-bold"> Desired Friend Count:</span> {task.desiredFriendCount}</p>
                <p className="text-white">{task.timeAchieved ? (`Completed on ${new Date(task.timeAchieved * 1000).toLocaleDateString("en-US")} (${diffInDays(task.timeAchieved)} days ago)`) : "Incomplete"}</p>
            </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-between space-x-4">
            <button className="bg-red-500 hover:bg-red-600 duration-100 text-white rounded px-4 py-2 flex items-center h-12"
                onClick={() => deleteTask(task._id)}>
                Delete
            </button>
            </div>
        </div>
    );
}
