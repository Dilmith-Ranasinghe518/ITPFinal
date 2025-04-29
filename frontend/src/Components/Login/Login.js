//Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// thisline
import { useUser } from "../Dashboards/UserContext";
import './Login.css';
import Footer from '../Footer/Footer';
import HomeNav from '../Nav/HomeNav';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setUser({ username, role: res.data.token });
      localStorage.setItem('token', res.data.token);
      navigate(`/dashboard/${res.data.role}`); // Corrected this line
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };
  
  return (
    <div className="home-container">
            <HomeNav/>
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="form-submit-btn">Login</button>
        </form>

        <p className="no-account">
          Don't have an account? <a href="/register" className="register-link">Register here</a>
        </p>
        
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default Login;