import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  return (
    <div className="Dashboard">
      <h1>Login Success</h1>
      {token ? (
        <p>Token: {token}</p>
      ) : (
        <p>No token found. Please try logging in again.</p>
      )}
    </div>
  );
};

export default Dashboard;
