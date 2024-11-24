import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        // Fetch admin details
        const response = await axios.get('https://notification-sytem.onrender.com/api/admin/details', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure response is valid
        if (response.data.success) {
          setAdminDetails(response.data.data); // Access the data property
        } else {
          setError('Failed to fetch admin details.');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setError(error.response?.data?.message || 'Failed to fetch admin details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to the admin login page
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message in red
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      {adminDetails ? (
        <div className="admin-info">
          <h2>Welcome, {adminDetails.username}</h2>
          <p>Email: {adminDetails.email}</p>
          <div className="button-container">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/create-notification')}>
              Create Notification
            </button>
          </div>
        </div>
      ) : (
        <p>No admin details available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
