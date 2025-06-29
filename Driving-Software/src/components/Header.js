import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">NIRMALA</h1>
      </div>
      <div className="header-right">
        <Link to="/login" className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </div>
    </header>
  );
}

export default Header; 