//Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// thisline
import { useUser } from "../Dashboards/UserContext";
import './Register.css';
import {Link} from "react-router-dom";
import Footer from '../Footer/Footer';
import HomeNav from '../Nav/HomeNav';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { setUser } = useUser();
  const navigate = useNavigate();

//error ekath success wenna haduwe 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password, role });
      // thisline
      setUser({ username, role });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration successful! Please log in.');
      navigate('/login');
    }
  };

  return (
    
    <div className="home-container">
      <HomeNav/>
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
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

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="recycler">Recycler</option>
              <option value="collector">Waste Collector</option>
              <option value="finance">Finance Manager</option>
              <option value="hr">HR Manager</option>
              <option value="recyclemgr">Recycle Manager</option>
            </select>
          </div>

          <button type="submit" className="form-submit-btn">Register</button>
        </form>
 {/* Added "Already have an account?" link below the submit button */}
 <p className="already-have-account">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>

      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Register;