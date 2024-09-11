import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/revhire_logo.png";
import heroImage from "../images/landingpage_demo.png";
import "../Styles/LoginPage.css";
import api from "../../config/api"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); 
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = "Password must be between 8 and 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
    
        const response = await api.post("/users/login", formData);
        
        if (response.status === 200) {
          navigate("/JobPortal");
        }
      } catch (error) {

        setApiError("Invalid email or password. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <nav className="login-navbar navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="#">
          RevHire Login
        </a>
      </nav>

      <div className="login-hero-section">
        <div className="login-hero-text">
          <img id="login-logo" src={logo} alt="RevHire Logo" />
          <h2 className="login-title">Welcome user!</h2>
          <p className="login-description">
            Please log in to access your dashboard and manage your job search.
          </p>
          <p className="additional-text">
            New to RevHire? <a href="/signup" className="signup-link">Sign up here</a>
          </p>
        </div>
        <div className="login-form-container">
          <img src={heroImage} alt="Hero" className="img-fluid login-hero-image" />
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            {apiError && <p className="api-error-message">{apiError}</p>}
            
            <button type="submit" className="custom-button btn">
              Log In
            </button>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <p>&copy; 2024 RevHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;