import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle regular login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      onLogin(); // Trigger the onLogin function passed as a prop
    } else {
      alert('Invalid credentials');
    }
  };

  // Google Login success handler
  const handleGoogleLogin = (response) => {
    if (response.profileObj) {
      alert('Google Login successful');
      onLogin(); // Trigger the onLogin function after successful Google login
    } else {
      alert('Google Login failed');
    }
  };

  // Google Login failure handler
  const handleGoogleFailure = (error) => {
    alert('Google Login failed: ' + error.error);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>


      {/* Optionally add a Sign-Up or Forgot Password link */}
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
