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
    <div className="flex flex-row items-center">
      <p className="font-bold"> Desired Level: </p>
      <input className="text-black m-4" type="number" value={wantedLevel} onChange={(e)=> setWantedLevel(Number(e.target.value))} min="0" step ="1"/>
    <button className="bg-green-600 text-white rounded px-4 flex items-center h-12" onClick={()=>addTask(wantedLevel)}>
      Submit
    </button>
    </div>
  );
}
