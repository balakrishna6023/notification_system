import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNotification.css'
const CreateNotification = () => {
  const navigate = useNavigate();

  const handleShowForm = (type) => {
    navigate(`/create-notification/${type}`);
  };

  return (
    <div className='style'>
      <h1>Create Notification</h1>
      <div>
        <button onClick={() => handleShowForm('custom')}>Custom Notification</button>
        <button onClick={() => handleShowForm('jvd')}>Notification for JVD Students</button>
        <button onClick={() => handleShowForm('non-jvd')}>Notification for Non-JVD Students</button>
        <button onClick={() => handleShowForm('bus-facility')}>Notification for Bus Facility Students</button>
        <button onClick={() => handleShowForm('hosteller')}>Notification for Hostel Students</button>
        <button onClick={() => handleShowForm('all-students')}>Notification for All Students</button>
      </div>
    </div>
  );
};

export default CreateNotification;
