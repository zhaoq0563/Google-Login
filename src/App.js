import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServerSide from './ServerSide';
import Dashboard from './Dashboard';
import GoogleAuthCallback from './GoogleAuthCallback';
import Hybrid from './Hybrid';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ServerSide />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Hybrid />} />
        <Route path="/google-auth-callback" element={<GoogleAuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;