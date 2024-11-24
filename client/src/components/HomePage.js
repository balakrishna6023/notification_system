import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AboutPage from './AboutPage'; // Import AboutPage component
import styles from './Home.module.css'; // Import the CSS Module

const HomePage = () => {
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [expiredNotifications, setExpiredNotifications] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState({}); // Track visibility of messages
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [showExpired, setShowExpired] = useState(false); // Toggle expired notifications

  const itemsPerPage = 15;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://notification-sytem.onrender.com/api/notifications/notifications');
        const currentDate = new Date();

        // Separate live and expired notifications
        const live = response.data.filter(notification => new Date(notification.deadline) >= currentDate);
        const expired = response.data.filter(notification => new Date(notification.deadline) < currentDate);

        // Sort each array in descending order
        const sortedLive = live.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedExpired = expired.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLiveNotifications(sortedLive);
        setExpiredNotifications(sortedExpired);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Toggle visibility of a notification message
  const toggleMessageVisibility = (id) => {
    setVisibleMessages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLiveNotifications = liveNotifications.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(liveNotifications.length / itemsPerPage);

  return (
    <div className={styles['main']}>
      <div className={styles['home-wrapper']}>
        <header className={styles['home-navbar']}>
          <h1>Notification System</h1>
          <div className={styles['home-nav-links']}>
            <Link to="/login/student">Student Login</Link>
            <Link to="/register/student">Student Register</Link>
            <Link to="/login/admin">Admin Login</Link>
            <Link to="/register/admin">Admin Register</Link>
          </div>
        </header>

        <main className={styles['home-content']}>
          <h2>Welcome to the Notification System</h2>

          {/* Live Notifications Section */}
          <section className={styles['home-notifications-section']}>
            <h3>Live Notifications</h3>
            <div className={styles['home-notifications-grid']}>
              {paginatedLiveNotifications.map((notification) => (
                <div key={notification._id} className={`${styles['home-notification-card']} ${styles['home-notification-info']}`}>
                  <h4 className={styles['home-notification-title']}>{notification.title}</h4>
                  <div className={styles['home-notification-message']}>
                    {visibleMessages[notification._id] ? (
                      <>
                        <p>{notification.message}</p>
                        <button
                          className={styles['toggle-message-button']}
                          onClick={() => toggleMessageVisibility(notification._id)}
                        >
                          Hide Message
                        </button>
                      </>
                    ) : (
                      <button
                        className={styles['toggle-message-button']}
                        onClick={() => toggleMessageVisibility(notification._id)}
                      >
                        View Message
                      </button>
                    )}
                  </div>
                  <span className={styles['home-deadline']}>Deadline: {new Date(notification.deadline).toLocaleDateString()}</span>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles['pagination']}>
              {currentPage > 1 && (
                <button className='previous' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              )}
              {currentPage < totalPages && (
                <button className='next' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              )}
            </div>
          </section>

          {/* Expired Notifications Section */}
          <button
            className={styles['toggle-message-button']}
            onClick={() => setShowExpired(!showExpired)}
          >
            {showExpired ? 'Hide Expired Notifications' : 'Show Expired Notifications'}
          </button>
          {showExpired && expiredNotifications.length > 0 && (
            <section className={styles['home-expired-notifications-section']}>
              <h3>Expired Notifications</h3>
              <div className={styles['home-notifications-grid']}>
                {expiredNotifications.map((notification) => (
                  <div key={notification._id} className={`${styles['home-notification-card']} ${styles['home-notification-error']}`}>
                    <h4 className={styles['home-notification-title']}>{notification.title}</h4>
                    <div className={styles['home-notification-message']}>
                      {visibleMessages[notification._id] ? (
                        <>
                          <p>{notification.message}</p>
                          <button
                            className={styles['toggle-message-button']}
                            onClick={() => toggleMessageVisibility(notification._id)}
                          >
                            Hide Message
                          </button>
                        </>
                      ) : (
                        <button
                          className={styles['toggle-message-button']}
                          onClick={() => toggleMessageVisibility(notification._id)}
                        >
                          View Message
                        </button>
                      )}
                    </div>
                    <span className={styles['home-deadline']}>Deadline: {new Date(notification.deadline).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Embed AboutPage here */}
          <AboutPage />
        </main>

        <footer className={styles['home-footer']}>
          <p>&copy; 2024 Notification System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
