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
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/websitebackground.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
    <div className="bg-slate-700/70">
                <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 animate-fadeIn">
                    {/* Title*/}
                    <div className="flex items-center justify-center mb-8">
                    <img
                        src="/images/Steam_icon_logo.png"
                        alt="Steam Logo"
                        className="mr-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
                        width={100}
                        height={100}
                    />
                    <h1 className="text-6xl font-bold text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]">
                        Steam Wrapped
                    </h1>
                    </div>

                    {/* Inputs */}
                    <div className="bg-gray-800/80 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">User ID:</label>
                        <input
                        type="text"
                        value={steamId}
                        onChange={handleIDChange}
                        className="rounded px-4 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500 hover:bg-blue-100 duration-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Steam URL:</label>
                        <input
                        type="text"
                        value={steamURL}
                        onChange={handleURLChange}
                        className="rounded px-4 py-2 text-black focus:outline-none focus:ring focus:ring-blue-500 hover:bg-blue-100 duration-100"
                        />
                    </div>
                    <button
                        onClick={submitToMongo}
                        className="bg-blue-500 text-white rounded px-6 py-2 font-semibold hover:bg-blue-600 transition duration-150"
                    >
                        Submit
                    </button>
                    </div>

                    {/* Info */}
                    <div className="bg-gray-800/80 p-4 rounded-lg shadow-lg mt-6 w-full max-w-md">
                    <p className="font-bold text-lg mb-2 bg-slate-900 p-4 rounded-lg">
                        NOTE: Your profile must be entirely public to show friends and games, and it must have a custom URL to function correctly.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col bg-slate-900 p-4 rounded-lg">
                            <p className="font-bold text-lg mb-2">These are examples you can use if you do not have an account:</p>
                        <div className="font-semibold">Example Profile 1:</div>
                        <p>Steam ID: 76561198116779058</p>
                        <p>Steam Profile URL: https://steamcommunity.com/id/galacticmaniac/</p>
                        </div>
                        <div className="flex flex-col bg-slate-900 p-4 rounded-lg">
                        <div className="font-semibold">Example Profile 2:</div>
                        <p>Steam ID: 76561198109081792</p>
                        <p>Steam Profile URL: https://steamcommunity.com/id/lucastemb/</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}
