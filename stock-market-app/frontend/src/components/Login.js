import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login';
import { loginUser } from './services/api';  // Assume this function handles email/password login
import './Login.css';  // Include styling for the login page

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      // Redirect to dashboard or handle successful login
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const responseGoogle = (response) => {
    console.log('Google response:', response);
    // Handle Google authentication
    // You can send response.tokenId to your backend for verification
  };

  const responseFacebook = (response) => {
    console.log('Facebook response:', response);
    // Handle Facebook authentication
    // You can send response.accessToken to your backend for verification
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"  // Replace with your Google client ID
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onError={(error) => setError('Google login failed')}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"  // Replace with your Facebook app ID
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="Login with Facebook"
          cssClass="facebook-button"
        />
      </div>
    </div>
  );
};

export default Login;
