import { useState, useEffect} from "react";
import Dashboard from "./dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean | undefined>(undefined);
  const [email, setEmail] = useState<string>("");

  useEffect(()=> {
    console.log(email);
  },[email])
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
   
  {loggedIn && ((!failed) ? (
    <>
    <Dashboard/>
    </>
  ): (<p> Error: Not an authorized user. </p>))}
  </GoogleOAuthProvider>
  );
}
