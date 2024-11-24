import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://notification-sytem.onrender.com/api/auth/login/admin',
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      alert(error.response?.data?.message || 'Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {/* Logout Button (Optional, depends on context) */}
      </div>
    </div>
  );
};

export default AdminLogin;
