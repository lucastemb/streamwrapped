import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  steamId: string
  steamUrl: string
}

export default function FriendTask({steamId, steamUrl, }: TaskProps) {
  const [responseMessage, setResponseMessage] = useState<any[]>([]);
  const [friendCount, setFriendCount] = useState<number>(0);

  const addTask = async (friends: number) => {
    const response = await axios.post('http://127.0.0.1:8080/add-friend-task/', {
      steamId,
      friendCount
    });
  }

  return (
    <div className="flex flex-row items-center">
      <p className="font-bold"> Desired Friend Count: </p>
      <input className="text-black m-4" type="number" value={friendCount} onChange={(e)=> setFriendCount(Number(e.target.value))} min="0" step ="1"/>
    <button className="bg-green-600 text-white rounded px-4 flex items-center h-12" onClick={()=>addTask(friendCount)}>
      Submit
    </button>
    </div>
  );
}
