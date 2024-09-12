import React from "react";
import CryptoJS from "crypto-js";

// Helper function to generate a random string (code verifier + state)
const generateRandomString = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
};

// Helper function to generate the SHA256 code challenge
const generateCodeChallenge = (codeVerifier) => {
    const hash = CryptoJS.SHA256(codeVerifier);
    return CryptoJS.enc.Base64.stringify(hash)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

const Hybrid = () => {
    const redirectToGoogleLogin = () => {
        const clientId = "339183375939-6ds7pl7hjniud51n77fvmk9lk8cnvd2m.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/google-auth-callback";  // Redirect URI back to your frontend (React)

        // Step 1: Generate code verifier and code challenge for PKCE
        const codeVerifier = generateRandomString(128);
        localStorage.setItem('pkce_code_verifier', codeVerifier);  // Store the code verifier in localStorage

        const codeChallenge = generateCodeChallenge(codeVerifier);

        const state = generateRandomString(64);  // Generate a random state parameter
        localStorage.setItem('oauth_state', state);  // Store the state in localStorage

        // Step 2: Construct the Google login URL with PKCE parameters (without backend redirect)
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}`;

        // Redirect to Google to log in (Google will send the authorization code back to the frontend)
        window.location.href = googleLoginUrl;
    };

    return (
        <button onClick={redirectToGoogleLogin}>
            Login with Google
        </button>
    );
};

export default Hybrid;
