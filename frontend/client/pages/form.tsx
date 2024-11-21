import { useState, useEffect} from "react";
import axios from "axios"; 
import { Dispatch, SetStateAction } from "react";

interface FormProps {
    email: string
    setExists: Dispatch<SetStateAction<boolean | undefined>>
}
export default function InputForm({ email, setExists}: FormProps) {
    const [steamId,setSteamId] = useState<string>()
    const [steamURL,setSteamURL] = useState<string>()
    
    const handleIDChange = (e: any) => {
        setSteamId(e.target.value)
    }
    const handleURLChange = (e:any) => {
        setSteamURL(e.target.value)
    }

    const submitToMongo = async () => {
        if (steamId && steamURL){
            axios.post(`http://localhost:8080/add-user/${encodeURIComponent(email)}/${encodeURIComponent(steamId)}/${encodeURIComponent(steamURL)}`).then((response)=> {
                if(response.status === 201){
                    setExists(true)
                }
            })
        }
    }


    return(
    <>
    <div className="bg-slate-700 min-h-screen text-white p-4"> 
           <div className="flex flex-row items-center mb-4">
          <label className="font-semibold items-center">User ID: </label>
          <input
            type="text"
            value={steamId}
            onChange={handleIDChange}
            className="rounded px-2 py-1 text-black mb-3"
          />
        </div>
        
        <div className="flex flex-row items-center mb-4">
          <label className="font-semibold items-center">Steam URL: </label>
          <input
            type="text"
            value={steamURL}
            onChange={handleURLChange}
            className="rounded px-2 py-1 text-black mb-3"
          />
        </div>

        <div> 
            <button onClick={submitToMongo} className="bg-blue-500 text-white rounded px-4 py-2 ml-2"> 
                Submit
            </button> 
        </div>
    </div>
    </>
    );
}