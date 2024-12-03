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
    const [validURL, setValidURL] = useState<boolean>(false)
    const [validId, setValidId] = useState<boolean>(false)
    const [failure, setFailure] = useState<boolean>(false)

    const handleIDChange = (e: any) => {
        setSteamId(e.target.value)
    }
    const handleURLChange = (e:any) => {
        setSteamURL(e.target.value)
    }
 // axios.get(`http://localhost:8000/search-url/?q=${encodeURIComponent(steamURL)}`).then((response) => {
                //     if(response.status === 200){
                //         setValidId(true);
                //     }
                // }),
                // axios.get(`http://localhost:8000/search-user/${encodeURIComponent(steamId)}`).then((response) => {
                //     if(response.status === 200){
                //         setValidId(true);
                //     }
                // }),
    const submitToMongo = async () => {
        if (steamId && steamURL){
            try {
                const [searchURL_Response, searchUser_Response] = await Promise.all([
                    axios.get(`http://localhost:8080/search-url/${encodeURIComponent(steamURL)}`),
                    axios.get(`http://localhost:8080/search-user/${encodeURIComponent(steamId)}`)
                ]);
                if(searchURL_Response.status === 200){
                    setValidURL(true);
                }
                if(searchUser_Response.status === 200){
                    setValidId(true);
                }
                if(searchURL_Response.status === 200 && searchUser_Response.status === 200){
                    setFailure(false);
                    const post_resp = await axios.post(
                        `http://localhost:8080/add-user/${encodeURIComponent(email)}/${encodeURIComponent(steamId)}/${encodeURIComponent(steamURL)}`
                    );
                    if(response.status === 201){
                        setExists(true);
                    }
                } else {
                    setFailure(true);
                }
            } catch (error){
                console.error("Error with submitToMongo",error);
            }
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
            {failure && !validId && (
                <p className="text-red-500 mt-4">Error: Invalid Id. ID must be all numbers and must appear as in your Steam account details</p>
                )}
            {failure && !validURL && (
                <p className="text-red-500 mt-4">Error: Invalid URL. URL must be a valid steam community profile link \n Example: https://steamcommunity.com/id/gaben</p>
                )}
            {failure && (
                <p className="text-red-500 mt-4">Account not added due to above reason(s)</p>
                )}
        </div>
    </div>
    </>
    );
}
