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
