import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
//import Navbar from './components/Navbar';
import Content from './components/Content';
import config from './config';

// TODO: May want to add an error check for googleClientId in config..
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <div>
        {/* <Navbar /> */}
        <div className="my-content container-fluid" style={{ padding: 0, margin: 0, height: '100vh' }}>
          <Content/>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;