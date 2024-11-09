import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Content from './components/Content';

const App: React.FC = () => {
  const googleClientId = 'google-client-id.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div>
        <Navbar />
        <div className="container-fluid" style={{ padding: 0, margin: 0, height: '90vh' }}>
          <Content/>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;