import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      if (response.status == 200) {
        navigate("/home");
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card-pro">
        <h1 className="login-title-pro">Sign In</h1>
        <p className="login-subtitle-pro">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleSubmit} className="login-form-pro">
          <div className="form-group-pro">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={formData.email ? "filled" : ""}
              autoComplete="username"
            />
            <label htmlFor="email">Email</label>
            <i className="fas fa-envelope input-icon-pro"></i>
          </div>
          <div className="form-group-pro">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={formData.password ? "filled" : ""}
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
            <i className="fas fa-lock input-icon-pro"></i>
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-toggle-pro`}
              onClick={togglePasswordVisibility}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            ></i>
          </div>
          <button type="submit" className="login-button-pro">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </button>
        </form>
        <div className="divider-pro">
          <span>or</span>
        </div>
        <div className="forgot-password-pro">
          <Link to="/forgot-password">
            <i className="fas fa-key"></i> Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
