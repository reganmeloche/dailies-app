import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 

interface GoogleAuthProps {
  setUser: React.Dispatch<React.SetStateAction<any>>; // Function to set the user in the parent component
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ setUser }) => {
  const [user, setLocalUser] = useState<any>(null); // Local state for Google user
  const [name, setName] = useState<string>('');

  // Handle successful login
  const onLoginSuccess = (response: any) => {
    const token = response.credential; 
    const decodedUser: any = jwtDecode(token);
    localStorage.setItem('google_token', token); 
    setLocalUser(response);
    setUser(response); 
    setName(decodedUser.given_name);
  };


  const logOut = () => {
        googleLogout();
        localStorage.removeItem('google_token');  // Remove token from localStorage
        setLocalUser(null);  // Clear local user state
        setUser(null);  // Clear user in the parent component's state
    };

  return (
    <>
      {user ? (
        <div style={{ color: 'white' }}>
            <span>Welcome, {name}</span>
            <button 
                onClick={logOut}
                className="btn btn-light"
                style={{ textDecoration: 'none', marginLeft: 10 }}
            >Log out</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={onLoginSuccess} 
          onError={() => console.log('Login Failed')} 
        />
      )}
    </>
  );
};

export default GoogleAuth;
