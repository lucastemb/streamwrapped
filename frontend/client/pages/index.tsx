import { useState, useEffect} from "react";
import Dashboard from "./dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import axios from "axios"; 
import Form from "./form"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [steamId, setSteamId] = useState<string>("");
  const [steamURL, setSteamURL] = useState<string>("");
  const [failed, setFailed] = useState<boolean | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [exists, setExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const getStuff = async () => {
      if (loggedIn && email) {
        try {
          const response = await axios.get(`http://localhost:8080/exists-user/${email}`);
          if (response.data.exists) {
            setSteamURL(response.data.user.steamURL);
            setSteamId(response.data.user.steamID);
            setExists(true);
          } else {
            setExists(false);
          }
        } catch (error) {
          console.error('Error', error);
          setExists(false);
        } finally {
          setLoading(false); 
        }
      }
    };
    getStuff();
  });

  return(
  <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || " "}>
  {!loggedIn && (<GoogleLogin onSuccess={(response)=> {
    const token = response.credential || "";
    const decodedResponse = jwtDecode(token) as {email:string}
    setEmail(decodedResponse.email)
    setLoggedIn(true)
  }} 
  onError={()=>{setFailed(true)}}
  />)}
   
  {loggedIn && ((!failed) && !loading ? (exists ?
    <> <Dashboard email={email} steamId={steamId} steamUrl={steamURL}/> 
    </> : <Form email={email} setExists={setExists}/>
  ): (<p> Error: Not an authorized user. </p>))}
  </GoogleOAuthProvider>
  );
}
