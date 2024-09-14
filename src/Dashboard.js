import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const token = localStorage.getItem('token');
  const userKey = localStorage.getItem('userKey');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userKey');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="center-container">
      {(token) ? (
        <><h1>Login Success</h1><p>Token: {token}</p><p>User key: {userKey}</p></>
      ) : (
        <><h1>You are not logged in yet.</h1></>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
