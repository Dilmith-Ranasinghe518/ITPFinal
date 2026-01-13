//Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Dashboards/UserContext";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import HomeNav from '../Nav/HomeNav';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5008/register', { username, password, role });
      setUser({ username, role });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration successful! Please log in.');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      <HomeNav />
      <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-primary-100 via-white to-secondary-100">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/50 relative z-10 transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-dark-800 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">Create Account</h2>
            <p className="text-gray-500 mt-2">Join us to make a difference</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="recycler">Recycler</option>
                  <option value="collector">Waste Collector</option>
                  <option value="finance">Finance Manager</option>
                  <option value="hr">HR Manager</option>
                  <option value="recyclemgr">Recycle Manager</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Register
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200">Login here</Link>
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;