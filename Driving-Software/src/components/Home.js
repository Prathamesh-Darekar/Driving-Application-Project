import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NewUserModal from "./NewUserModal";
import UserDetailsModal from "./UserDetailsModal";
import axios from "axios";
import "./Home.css";
import { toast, Toaster } from 'react-hot-toast';

function Home() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    // Simulate API call to search for user
    try {
      // This would be your actual API call
      const response = await axios.get(
        `http://localhost:8000/api/${mobileNumber}`
      );
      if (response.status == 200) {
        setUserData(response.data.customerData);
        setIsUserDetailsModalOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Mobile number not found!', { position: 'top-center' });
      } else {
        toast.error(error.response?.data?.message || error.message, { position: 'top-center' });
      }
    }
  };

  return (
    <div className="home-container">
      <Toaster position="top-center" />
      <Header />
      <main className="main-content">
        <div className="search-container">
          <h2>Search by Mobile Number</h2>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <i className="fas fa-search"></i>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="new-user-container">
          <div className="new-user-box">
            <button
              className="new-user-button"
              onClick={() => setIsNewUserModalOpen(true)}
            >
              <i className="fas fa-plus"></i>
              Add New User
            </button>
          </div>
        </div>
      </main>
      <Footer />

      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
      />

      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        onClose={() => setIsUserDetailsModalOpen(false)}
        userData={userData}
      />
    </div>
  );
}

export default Home;
