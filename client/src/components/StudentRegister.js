import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.css';

const StudentRegister = () => {
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jvdStatus, setJvdStatus] = useState('JVD');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [hosteller, setHosteller] = useState(true); // Default to true
  const [busFacility, setBusFacility] = useState(false); // Default to false
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      await axios.post('https://notification-sytem.onrender.com/api/auth/register/student', {
        rollNo,
        email,
        password,
        jvdStatus,
        semester: Number(semester), // Ensure semester is a number
        year: Number(year), // Ensure year is a number
        hosteller: hosteller ? 'Hosteller' : 'Non-Hosteller', // Convert to string for consistency
        busFacility: busFacility ? 'Bus' : 'Non-Bus', // Convert to string for consistency
      });
      alert('Student registered successfully. Please login.');
      navigate('/login/student'); // Redirect to student login page
    } catch (error) {
      console.error('Student registration error:', error);
      alert(`Registration failed: ${error.response?.data?.message || 'Please try again.'}`);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className='container p-3 col-sm-5 shadow-lg '>
      <div className=" p-3 ">
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)} 
          placeholder="Roll Number" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Student Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <select 
          value={jvdStatus} 
          onChange={(e) => setJvdStatus(e.target.value)} 
          required
        >
          <option value="JVD">JVD</option>
          <option value="Non-JVD">Non-JVD</option>
        </select>
        <input 
          type="number" 
          value={semester} 
          onChange={(e) => setSemester(e.target.value)} 
          placeholder="Semester (1-8)" 
          min="1" 
          max="8" 
          required 
        />
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Year (1-4)" 
          min="1" 
          max="4" 
          required 
        />
        <label>
          Hosteller:
          <input 
            type="checkbox" 
            checked={hosteller} 
            onChange={(e) => {
              setHosteller(e.target.checked);
              if (e.target.checked) {
                setBusFacility(false); // Reset bus facility if the student is a hosteller
              }
            }} 
          />
        </label>
        {!hosteller && (
          <label>
            Bus Facility:
            <input 
              type="checkbox" 
              checked={busFacility} 
              onChange={(e) => setBusFacility(e.target.checked)} 
            />
          </label>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default StudentRegister;
