import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Reset Password</h1>
        <p className="reset-text">
          <i className="fas fa-info-circle"></i> Enter your email address and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            <label htmlFor="email">Email</label>
            <i className="fas fa-envelope input-icon"></i>
          </div>
          <button type="submit" className="login-button">
            <i className="fas fa-paper-plane"></i> Send Reset Link
          </button>
        </form>
        <div className="back-to-login">
          <Link to="/login">
            <i className="fas fa-arrow-left"></i> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 