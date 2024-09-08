import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const redirectToGoogleLogin = () => {
    const clientId = '339183375939-6ds7pl7hjniud51n77fvmk9lk8cnvd2m.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8080/api/common/oauth-success';
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = googleLoginUrl;
  };

  return (
    <div className="MainPage">
      <h1>Welcome to My App</h1>
      <button onClick={redirectToGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default MainPage;