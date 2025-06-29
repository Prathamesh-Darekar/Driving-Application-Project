import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>NIRMALA - Your trusted partner in driving excellence.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p><i className="fas fa-phone"></i> +91 1234567890</p>
          <p><i className="fas fa-envelope"></i> info@nirmala.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 NIRMALA. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 