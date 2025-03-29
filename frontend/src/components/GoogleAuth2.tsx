import React, { useEffect, useState } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import config from '../config';

interface GoogleAuthProps {
  setUser: React.Dispatch<React.SetStateAction<any>>; // Prop function to set the user in the parent component
}

// TODO: May switch to using HttpOnly cookies intead of localStorage
// TODO: Add token refresh handling logic
// TODO: Better and more user-friendly error-handling for failed auth flows
// TODO: Add a loading state after login
// TODO: May be able to combine the setLocalUser and setUser
const GoogleAuth: React.FC<GoogleAuthProps> = ({ setUser }) => {
    const [user, setLocalUser] = useState<any>(null); // Local state for Google user
    const [name, setName] = useState<string>(''); // Stores the user's first name for display

    // When component mounts, try to fetch and restore the access token
    useEffect(() => {
        validateToken();
    }, []); 

    // Sets all the variables with user info after login/validation
    const completeLogin = (user: any) => {
        setLocalUser(user);
        setUser(user);
        setName(user.given_name);
    }

    // Check for the accessToken in localStorage, validate it on the backend to get the user info
    const validateToken = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return;
        }

        try {
            const res = await axios.post('/api/validate', { token });
            completeLogin(res.data.user);
        } catch (error) {
            console.error('Error validating token:', error);
            logOut(); // Log out if the token is invalid
        }
    }

    // Exchange the Google auth code for user info and access token
    const loginSuccess = async (authCode: any) => {
        try {
            const res = await axios.post('/api/auth', { code: authCode });
            completeLogin(res.data.user);
            localStorage.setItem('accessToken', res.data.accessToken);
        } catch (error) {
            console.error('Error during login', error);
        }
    }

    // Auth is powered by the useGoogleLogin function, using the 'auth-flow' approach
    // Returns an auth code, which must be exchanged for an access token and information
    // This exchange is done on the back-end
    const login = useGoogleLogin({
        onSuccess: async (googleResponse) => await loginSuccess(googleResponse.code),
        flow: 'auth-code',
        scope: config.authScope,
        redirect_uri: config.redirectUri,
    });

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('accessToken');  // Remove token from localStorage
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
            <button 
                onClick={() => login()}
                className="btn btn-light"
                style={{ textDecoration: 'none', marginLeft: 10 }}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png"
                    alt="Google Logo"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                Google Login
            </button>
        )}
    </>
  );
};

export default GoogleAuth;
