import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="center-container">
      {(token) ? (
        <><h1>Login Success</h1><p>Token: {token}</p></>
      ) : (
        <><h1>You are not logged in yet.</h1><p>Token: {token}</p></>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
