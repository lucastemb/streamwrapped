import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Dashboard from './dashboard';
import Form from './form';

//Logic for Homepage
const Home: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [steamId, setSteamId] = useState('');
  const [steamURL, setSteamURL] = useState('');
  const [email, setEmail] = useState('');
  const [exists, setExists] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(true); // Add loading state

  //  checkUserExists checks if user is logged in, and if email has been returned by Google OAuth. If true, then checks if user exists in database.
  //      if user exists, then steamId and steamURL variables will be filled with valid data. 
  
  useEffect(() => {
    const checkUserExists = async () => {
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

    checkUserExists();
  }, [loggedIn, email]);

  const handleLoginSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential || '';
    const decodedResponse = jwtDecode(token) as { email: string };
    setEmail(decodedResponse.email);
    setLoggedIn(true);
  };
  
  //  when checkUserExists sets `loading` to false (e.g. returned from function, error or not) the user will be brought
  //    to the dashboard if user exists. if user didn't exist, but Google OAuth returned no error, then the user will
  //    be brought to the account creation form. If Google OAuth raises an error, an appropriate error message is 
  //    displayed on this page. finally, if user is not logged in according to Google OAuth, then this page displays
  //    the Google OAuth login button, which allows the whole process to repeat again.

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url('/images/websitebackground.jpg')`}}>
        <div className="bg-slate-700/70 min-h-screen text-white flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-8 opacity-0 animate-fadeIn">
            <img src="/images/Steam_icon_logo.png" alt="Steam Logo" className="mr-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]" width={100} height={100} />
            <h1 className="text-6xl font-bold text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]">Steam Wrapped</h1>
          </div>
          <div className="bg-slate-200/50 text-white px-4 py-2 rounded-lg opacity-0 animate-fadeIn">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ''}>
              <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return exists ? (
    <Dashboard email={email} steamId={steamId} steamUrl={steamURL} />
  ) : (
    <Form email={email} setExists={setExists} />
  );
};

export default Home;
