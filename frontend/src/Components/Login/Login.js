//Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// thisline
import { useUser } from "../Dashboards/UserContext";
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
      const res = await axios.post('http://localhost:5008/login', { username, password });
      setUser({ username, role: res.data.token });
      localStorage.setItem('token', res.data.token);
      navigate(`/dashboard/${res.data.role}`); // Corrected this line
    } catch (err) {
      alert('Login failed. Please try again.');
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
            <h2 className="text-3xl font-extrabold text-dark-800 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Log in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200">
              Register here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;