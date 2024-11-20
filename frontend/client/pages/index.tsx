import { useState, useEffect} from "react";
import Dashboard from "./dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"
import axios from "axios"; 

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [exists, setExists] = useState<boolean>();

  useEffect(()=> {
    if(loggedIn && email){
      console.log(email)
      axios.get(`http://localhost:8080/exists-user/${email}`).then((response)=> {
        if(response.data.exists === true){
          setExists(true)
        }
        else if (response.data.exists === false) {
          setExists(false)
        }
      }).catch((error) => {
        console.error('Error', error)
        setExists(false)
      })
    }
  },[loggedIn, email])

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
   
  {loggedIn && ((!failed) ? (exists ?
    <>
    <Dashboard/>
    </> : <div> Hello </div>
  ): (<p> Error: Not an authorized user. </p>))}
  </GoogleOAuthProvider>
  );
}
