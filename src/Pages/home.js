import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/home.css';

function Home() {
  const navigate = useNavigate();
  

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  const handleRegisterClick = () => {
    // Navigate to the login page
    navigate('/register/customer');
  };


  return (
    <div className="home-container">
      
  
        
        <div>
          <h1>Home</h1>
          <button className="action-button1" onClick={handleLoginClick}>
            Login
          </button>
          <button className="action-button1" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      

    </div>
  );
}

export default Home;
