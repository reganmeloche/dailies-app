import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ padding: 0, margin: 0, height: '90vh' }}>
        <Content/>
      </div>
    </div>
  );
};

export default App;