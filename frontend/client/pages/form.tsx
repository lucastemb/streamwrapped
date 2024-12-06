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
        let searchURL_Response;
        if (steamId && steamURL){
            try {
                if(steamURL.length > 30 && steamURL.substring(0,30) === "https://steamcommunity.com/id/"){
                    searchURL_Response=await axios.get(`http://localhost:8080/search-url?steamURL=${encodeURIComponent(steamURL)}`);
                    console.log("search url status",searchURL_Response.status);
                    if(searchURL_Response&& searchURL_Response.status === 200){
                        setValidURL(true);
                    }
                    
                }else if(steamURL.length>22 && steamURL.substring(0,22) === "steamcommunity.com/id/"){
                    searchURL_Response=await axios.get(`https://${encodeURIComponent(steamURL)}`);
                    console.log(searchURL_Response.status);
                    if(searchURL_Response&& searchURL_Response.status === 200){
                        setValidURL(true);
                    }
                }else{
                    setValidURL(false);
                }
            }catch(error){
                console.log((error.response)?(error.response.status):("no response from server"));
                setValidURL(false);
                setFailure(true);
            }
            try {
                const searchUser_Response = await axios.get(`http://localhost:8080/validate-user-id/${encodeURIComponent(steamId)}`);
                console.log(searchUser_Response.status);
                if(searchUser_Response&& searchUser_Response.status === 200){
                    setValidId(true);
                }
                if(searchURL_Response && searchURL_Response.status === 200 && searchUser_Response && searchUser_Response.status === 200){
                    setFailure(false);
                    const post_resp = await axios.post(
                        `http://localhost:8080/add-user/${encodeURIComponent(email)}/${encodeURIComponent(steamId)}/${encodeURIComponent(steamURL)}`
                    );
                    if(post_resp.status === 201){
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
                <p className="text-red-500 mt-4" itemprop={steamURL.substring(0,29)}>Error: Invalid URL. URL must be a valid steam community profile link \n Example: https://steamcommunity.com/id/gaben</p>
                )}
            {failure && (
                <p className="text-red-500 mt-4">Account not added due to above reason(s)</p>
                )}
        </div>
    </div>
    </>
    );
}
