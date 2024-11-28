import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [failed, setFailed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (loggedIn && email) {
      axios.get(`http://localhost:8080/exists-user/${email}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error', error);
          setFailed(true);
        });
    }
  }, [loggedIn, email]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || " "}>
    {/* Conditionally render based on loggedIn state */}
    {!loggedIn ? (
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/websitebackground.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-slate-700/70 min-h-screen text-white flex flex-col items-center justify-center">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <img
              src="/images/Steam_icon_logo.png"
              alt="Steam Logo"
              className="mx-auto mb-4"
              width={70}
              height={70}
            />
            <h1 className="text-3xl font-bold">Steam Wrapped</h1>
          </div>

          {/* Google Login */}
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <GoogleLogin
              onSuccess={(response) => {
                const token = response.credential || "";
                const decodedResponse = jwtDecode(token) as { email: string };
                setEmail(decodedResponse.email); // Set email state
                setLoggedIn(true); // Set loggedIn state
              }}
              onError={() => {
                setFailed(true);
              }}
            />
          </div>

          {/* Error Message */}
          {failed && (
            <p className="text-red-500 mt-4">Error: Not an authorized user.</p>
          )}
        </div>
      </div>
    ) : (
      <Dashboard
        email={email}
        steamId="someSteamId"
        steamUrl="someSteamUrl"
      />
    )}
  </GoogleOAuthProvider>
);
}
