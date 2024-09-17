import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import "../Styles/ResetPassword.css";
import api from "../../config/api"; 

const ResetPasswordEmployer = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.oldPassword.length < 8) {
      newErrors.oldPassword = "Old password must be at least 8 characters";
    }
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }
    if (formData.oldPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from old password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/employers/reset-password", null, {
          params: {
            email: formData.email,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
          }
        });
        if (response.status === 200) {
          toast.success("Password has been successfully reset.", {
            position: "top-right", 
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
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
    <div className="reset-password-container">
      <nav className="login-navbar navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="#">
          RevHire Reset Password
        </a>
      </nav>

      <div className="reset-password-section">
        <div className="reset-password-text">
          <h2 className="reset-password-title">Reset Your Password</h2>
          <p className="reset-password-description">
            Please enter your email and old password, then provide a new password.
          </p>
        </div>
        <div className="reset-password-form-container">
          <form className="reset-password-form" onSubmit={handleSubmit}>
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
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                className="form-control"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
              />
              {errors.oldPassword && <p className="error-message">{errors.oldPassword}</p>}
            </div>

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

            {apiError && <p className="api-error-message">{apiError}</p>}
            
            <button type="submit" className="custom-button btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ResetPasswordEmployer;
