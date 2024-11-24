import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adminregister.css';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('https://notification-sytem.onrender.com/api/auth/register/admin', {
        username,
        email,
        password,
        adminCode,
      });
      alert('Admin registered successfully. Please login.');
      navigate('/login/admin');
    } catch (error) {
      console.error('Admin registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Admin Registration</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister} className="register-form">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
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
          <input 
            type="text" 
            value={adminCode} 
            onChange={(e) => setAdminCode(e.target.value)} 
            placeholder="Admin Code" 
            required 
          />
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
