import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/revhire_logo.png";
import heroImage from "../images/landingpage_demo.png";
import "../Styles/ForgotPassword.css";
import api from "../../config/api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", otp: "", newPassword: "" });
  const [userType, setUserType] = useState("job_seeker"); // Default userType is 'employer'
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Function to get API URL based on userType
  const getApiUrl = (path) => {
    return userType === "job_seeker" ? `/users${path}` : `/employers${path}`;
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = "Please enter the OTP";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNewPassword = () => {
    const newErrors = {};
    if (formData.newPassword.length < 8 || formData.newPassword.length > 20) {
      newErrors.newPassword = "Password must be between 8 and 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      try {
        await api.post(getApiUrl('/forgot-password'), null, { params: { email: formData.email } });
        setStep(2);
        toast.success("OTP sent to your email!");
      } catch (error) {
        setApiError("Failed to request OTP. Please try again.");
        toast.error("Failed to send OTP.");
      }
    }
  };

  const handleValidateOtp = async (e) => {
    e.preventDefault();
    if (validateOtp()) {
      setStep(3);
      toast.success("OTP verified! Please enter your new password.");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validateNewPassword()) {
      try {
        await api.post(getApiUrl('/reset-password-otp'), null, {
          params: {
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.newPassword
          }
        });
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Delay for toast display
      } catch (error) {
        setApiError("Failed to reset password. Please try again.");
        toast.error("Failed to reset password.");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update the selected user type
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer /> {/* ToastContainer for displaying toasts */}
      <nav className="forgot-password-navbar navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="#">
          RevHire Forgot Password
        </a>
      </nav>

      <div className="forgot-password-hero-section">
        <div className="forgot-password-hero-text">
          <img id="forgot-password-logo" src={logo} alt="RevHire Logo" />
          <h2 className="forgot-password-title">Forgot Your Password?</h2>
          <p className="forgot-password-description">
            Follow the steps to reset your password.
          </p>
        </div>
        <div className="forgot-password-form-container">
          <img src={heroImage} alt="Hero" className="img-fluid forgot-password-hero-image" />

          {/* User Type Dropdown */}
          <div className="form-group">
            <label htmlFor="userType">Select User Type</label>
            <select
              name="userType"
              id="userType"
              className="form-control"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="employer">Employer</option>
              <option value="job_seeker">Job Seeker</option>              
            </select>
          </div>

          {step === 1 && (
            <form className="forgot-password-form" onSubmit={handleRequestOtp}>
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

              {apiError && <p className="api-error-message">{apiError}</p>}

              <button type="submit" className="custom-button btn">
                Request OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="forgot-password-form" onSubmit={handleValidateOtp}>
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="form-control"
                  value={formData.otp}
                  onChange={handleInputChange}
                  required
                />
                {errors.otp && <p className="error-message">{errors.otp}</p>}
              </div>

              <button type="submit" className="custom-button btn">
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form className="forgot-password-form" onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="form-control"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
              </div>

              <button type="submit" className="custom-button btn">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="forgot-password-footer">
        <p>&copy; 2024 RevHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
