import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./studentlogin.css"; // Ensure to create or update this CSS file

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indication
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(
        "https://notification-sytem.onrender.com/api/auth/login/student",
        { email, password }
      );

      // Store the token and email in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);

      // Display success message and redirect
      alert("Login successful!");
      console.log(response.data); // For debugging

      // Redirect to the student's dashboard
      navigate("/dashboard/student");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials, please try again."); // Set a more user-friendly error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
