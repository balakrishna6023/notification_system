import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './studentdashboard.css'; // Import the CSS file

const StudentDashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const email = localStorage.getItem('email');

        if (!email) {
          setError('No email found in local storage.');
          setLoading(false);
          return;
        }

        // Fetch student details based on the email
        const studentResponse = await axios.get('https://notification-sytem.onrender.com/api/student/details', {
          params: { email }, // Pass email as a query parameter
        });

        // Check if the student details are available
        if (studentResponse.data.success) {
          setStudentDetails(studentResponse.data.data); // Access the data property in the response
        } else {
          setError('Failed to fetch student details.');
        }

        // Fetch notifications based on the email
        const notificationsResponse = await axios.get('https://notification-sytem.onrender.com/api/student/notifications', {
          params: { email }, // Pass email as a query parameter
        });

        // Check if notifications are available
        if (notificationsResponse.data.success) {
          setNotifications(notificationsResponse.data.data); // Access the data property in the response
        } else {
          setError('Failed to fetch notifications.');
        }

        // Set success message
        // setSuccessMessage('Data fetched successfully.');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || 'Failed to fetch data.'); // Use the specific error message from response if available
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('email'); // Remove email from local storage
    navigate('/'); // Redirect to the homepage
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Use CSS class for error message
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="success-message">{successMessage}</h1>
      <div className="dashboard-content">
        <div className="student-details">
          {studentDetails ? (
            <>
              <h2 className="welcome-message">Welcome</h2>
              <p className="roll-number">Roll Number: {studentDetails.rollNo}</p>
              <p className="email">Email: {studentDetails.email}</p>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              <button className="logout-button" onClick={() => navigate('/payments')}>Payment Status</button>

            </>
          ) : (
            <p>No student details available.</p>
          )}
        </div>
        <div className="notification-section">
          <h2>Your Notifications</h2>
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification._id} className="notification-item">
                  <strong>{notification.title}</strong>: {notification.message} 
                  <span className="notification-deadline">
                    (Deadline: {new Date(notification.deadline).toLocaleDateString()})
                  </span>
                </li>
              ))
            ) : (
              <li>No notifications available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
