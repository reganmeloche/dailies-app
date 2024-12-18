import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#home">Dailies App</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      <div style={{ marginRight: 8 }}>
        <GoogleAuth setUser={setUser} />  {/* Pass the setUser function to GoogleAuth */}
      </div>

    </nav>
  );
};

export default Navbar;
