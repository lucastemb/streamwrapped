import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  task: any
  deleteTask: any
}

export default function FriendTile({task, deleteTask}: TaskProps) {

  return (
   <div className="bg-slate-800/80 text-white rounded-lg mb-4 p-4 w-3/4 max-w-2xl mx-auto drop-shadow-lg">
        <div className="bg-blue-900 text-white rounded-lg p-4 mb-2">
        <div className="flex items-center flex-col space-x-4">
            <p className="text-sm text-gray-300"> <span className="font-bold"> Desired Friend Count:</span> {task.desiredFriendCount}</p>
            <p className="text-gray-300">{task.timeAchieved ? (`Complete ${task.timeAchieved}`) : "Incomplete"}</p>
        </div>
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
