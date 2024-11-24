import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import CreateNotification from './components/CreateNotification';
import NotificationForm from './components/NotificationForm';
import PaymentsPage from './components/PaymentsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/create-notification" element={<CreateNotification />} />
        {/* Dynamic route for different notification types */}
        <Route path="/create-notification/:type" element={<NotificationForm />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
