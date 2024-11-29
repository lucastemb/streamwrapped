import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
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

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || " "}>
      {!loggedIn ? (
        <div
          className="min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/websitebackground.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="bg-slate-700/70 min-h-screen text-white flex flex-col items-center justify-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-8 opacity-0 animate-fadeIn">
              <img
                src="/images/Steam_icon_logo.png"
                alt="Steam Logo"
                className="mr-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
                width={100}
                height={100}
              />
              <h1 className="text-6xl font-bold text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]">Steam Wrapped</h1>
            </div>

            {/* Google Login */}
            <div className="bg-slate-200/50 text-white px-4 py-2 rounded-lg opacity-0 animate-fadeIn">
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
        (!failed && !loading ? (
          exists ? (
            <Dashboard email={email} steamId={steamId} steamUrl={steamURL} />
          ) : (
            <Form email={email} setExists={setExists} />
          )
        ) : (
          <p className="text-center text-red-500 mt-4">
            {loading ? "Loading..." : "Error: Not an authorized user."}
          </p>
        ))
      )}
    </GoogleOAuthProvider>
  );
}
