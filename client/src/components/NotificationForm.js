import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NotificationForm.css';

const NotificationForm = () => {
  const { type } = useParams(); // Get notification type from URL
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [criteria, setCriteria] = useState({
    jvdStatus: '',
    semester: '',
    year: '',
    hosteller: '',
    busFacility: '',
  });
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const endpoint = `http://localhost:5000/api/notifications/create/${type}-notification`;
    const payload = { title, message, deadline };

    if (type === 'custom') {
      payload.criteria = Object.fromEntries(
        Object.entries(criteria).filter(([_, value]) => value)
      );
    }

    try {
      const response = await axios.post(endpoint, payload);
      setPopupMessage(`Notification created! ${response.data.studentsNotified || 0} students will receive this notification.`);
      setShowPopup(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create notification.');
    }
  };

  return (
    <div className="notification-form">
      <h1 className="notification-form__title">Create {type.charAt(0).toUpperCase() + type.slice(1)} Notification</h1>
      <form onSubmit={handleSubmit} className="notification-form__form">
        <div className="notification-form__field">
          <label className="notification-form__label">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="notification-form__input"
          />
        </div>
        <div className="notification-form__field">
          <label className="notification-form__label">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="notification-form__textarea"
          />
        </div>
        <div className="notification-form__field">
          <label className="notification-form__label">Deadline:</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="notification-form__input"
          />
        </div>

        {type === 'custom' && (
          <>
            <h4 className="notification-form__criteria-title">Criteria:</h4>
            <div className="notification-form__field">
              <label className="notification-form__label">JVD Status:</label>
              <select
                value={criteria.jvdStatus}
                onChange={(e) => setCriteria({ ...criteria, jvdStatus: e.target.value })}
                className="notification-form__select"
              >
                <option value="">Select JVD Status</option>
                <option value="JVD">JVD</option>
                <option value="Non-JVD">Non-JVD</option>
              </select>
            </div>
            <div className="notification-form__field">
              <label className="notification-form__label">Semester:</label>
              <select
                value={criteria.semester}
                onChange={(e) => setCriteria({ ...criteria, semester: e.target.value })}
                className="notification-form__select"
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="notification-form__field">
              <label className="notification-form__label">Year:</label>
              <select
                value={criteria.year}
                onChange={(e) => setCriteria({ ...criteria, year: e.target.value })}
                className="notification-form__select"
              >
                <option value="">Select Year</option>
                {[...Array(4)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="notification-form__field">
              <label className="notification-form__label">Hosteller Status:</label>
              <select
                value={criteria.hosteller}
                onChange={(e) => setCriteria({ ...criteria, hosteller: e.target.value })}
                className="notification-form__select"
              >
                <option value="">Select Hosteller Status</option>
                <option value="Hosteller">Hosteller</option>
                <option value="Non-Hosteller">Non-Hosteller</option>
              </select>
            </div>
            <div className="notification-form__field">
              <label className="notification-form__label">Bus Facility:</label>
              <select
                value={criteria.busFacility}
                onChange={(e) => setCriteria({ ...criteria, busFacility: e.target.value })}
                className="notification-form__select"
              >
                <option value="">Select Bus Facility</option>
                <option value="Bus">Bus</option>
                <option value="Non-Bus">Non-Bus</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="notification-form__button">Create Notification</button>
      </form>

      {error && <div className="notification-form__error">{error}</div>}
      {showPopup && (
        <div className="notification-form__popup">
          {popupMessage}
          <button
            onClick={() => {
              setShowPopup(false);
              navigate('/dashboard/admin');
            }}
            className="notification-form__popup-button"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationForm;
