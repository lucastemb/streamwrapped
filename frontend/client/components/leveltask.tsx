import {useEffect, useState} from 'react'
import axios from 'axios';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface TaskProps {
  steamId: string
  setSubmitted: Dispatch<SetStateAction<boolean>>
  submitted: boolean
}

export default function LevelTask({steamId, setSubmitted, submitted }: TaskProps) {
  const [wantedLevel, setWantedLevel] = useState<number>(0);

  const addTask = async (level: number) => {
    const response = await axios.post('http://127.0.0.1:8080/add-level-task/', {
      steamId,
      wantedLevel
    });
    if (response.status === 201) {
      setSubmitted(!submitted);  
    }
  }

  return (
    <div className="flex flex-col justify-center px-2 py-2 m-2 bg-gradient-to-b from-blue-800 to-slate-900 rounded-md">
      <h1 className="text-lg font-bold text-center mb-2 border-b-2 border-white">Level Goal</h1>
      <div className="bg-slate-800 px-2 py-2 rounded-md">
        <p className="font-semibold"> Desired Level: </p>
        <input className="text-white mb-1 rounded-sm bg-blue-600 hover:bg-blue-700 duration-100" type="number" value={wantedLevel} onChange={(e)=> setWantedLevel(Number(e.target.value))} min="0" step ="1"/>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-green-500 text-white rounded px-4 flex items-center h-12 hover:bg-green-600 duration-100 my-1" onClick={()=>addTask(wantedLevel)}>
          Submit
        </button>
      </div>
    </div>
  );
}
