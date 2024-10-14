// import { useEffect } from 'react';
// import axios from 'axios';

// const GoogleAuthCallback = () => {
//     useEffect(() => {
//         // Parse the authorization code from the URL
//         const params = new URLSearchParams(window.location.search);
//         const authorizationCode = params.get('code');
//         const returnedState = params.get('state');

//         // Retrieve the stored state value from localStorage
//         const storedState = localStorage.getItem('oauth_state');
//         // Verify that the returned state matches the stored state
//         if (storedState !== returnedState) {
//             console.error('Invalid state parameter: possible CSRF attack');
//             return;  // Stop the OAuth flow if state doesn't match
//         }

//         if (authorizationCode) {
//             // Retrieve the code verifier from localStorage
//             const codeVerifier = localStorage.getItem('pkce_code_verifier');

//             // Send the authorization code and code verifier to the backend
//             axios.post('http://localhost:8080/api/common/oauth-hybrid', {
//                 code_verifier: codeVerifier,
//                 authorization_code: authorizationCode
//             }).then(response => {
//                 console.log('JWT Token:', response.data.token);
//                 console.log('User key:', response.data.key)

//                 // Redirect the user to the dashboard or some other page
//                 window.location.href = '/dashboard';
//             }).catch(error => {
//                 console.error('Error exchanging authorization code:', error);
//             });
//         }
//     }, []);

//     return <div>Logging in...</div>;
// };

// export default GoogleAuthCallback;


// Try to debug the API called twice problem:

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
    console.log('GoogleAuthCallback component rendered');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleAuthCallback = useCallback(async () => {
        if (isProcessing) return;

        setIsProcessing(true);

        const params = new URLSearchParams(window.location.search);
        const authorizationCode = params.get('code');
        const returnedState = params.get('state');

        const storedState = localStorage.getItem('oauth_state');
        if (storedState !== returnedState) {
            console.error('Invalid state parameter: possible CSRF attack');
            setIsProcessing(false);
            return;
        }

        if (authorizationCode) {
            const codeVerifier = localStorage.getItem('pkce_code_verifier');

            try {
                const user = { codeVerifier: codeVerifier, authorizationCode: authorizationCode };
                const response = await axios.post('http://localhost:8080/api/user/oauth-handle-authResponse-login', user);

                console.log('JWT Token:', response.data.token);
                console.log('User key:', response.data.userKey);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userKey', response.data.userKey);

                // Clear localStorage
                localStorage.removeItem('oauth_state');
                localStorage.removeItem('pkce_code_verifier');

                // Use React Router for navigation
                // setTimeout(() => {
                //     navigate('/dashboard');
                // }, 5000);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error exchanging authorization code:', error);
            } finally {
                setIsProcessing(false);
            }
        }
    }, [isProcessing, navigate]);

    useEffect(() => {
        console.log('useEffect triggered');
        handleAuthCallback();
    }, [handleAuthCallback]);

    return <div>{isProcessing ? 'Logging in...' : 'Redirecting...'}</div>;
};

export default GoogleAuthCallback;