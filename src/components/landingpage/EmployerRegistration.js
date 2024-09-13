import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/revhire_logo.png";
import heroImage from "../images/landingpage_demo.png";
import "../Styles/Jobseekereg.css";
import api from "../../config/api";

const EmployerRegistration = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8 || formData.password.length > 20) {
      newErrors.password = "Password must be between 8 and 20 characters";
    }
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.contactNumber.match(/^[0-9]{10}$/)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const generateRandomDate = () => {
          const start = new Date(1950, 0, 1);  
          const end = new Date(2000, 0, 1);    
          const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          return randomDate.toISOString().split('T')[0];  
        };
        const getRandomRoleId = () => {
          const roleIds = [1, 2, 3, 4, 5];  
          return roleIds[Math.floor(Math.random() * roleIds.length)];  
        };
        const response = await api.post("/employers/register", {
          username: formData.userName,
          password: formData.password,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactNumber: formData.contactNumber,
          
        });
        const responsejwt = await api.post('/v1/register', { 
          username: formData.userName,
          password: formData.password,
          email: formData.email,
          phone: formData.contactNumber,
          dob: generateRandomDate(),     
          gender: Math.random() > 0.5 ? 'male' : 'female',  
          address: formData.address,
          roleId: getRandomRoleId() 
        });
        if (response.status === 200) {
          toast.success("Registration successful. Redirecting to login...");
          setTimeout(() => navigate("/login"), 5000); 
        } else {
          toast.error("Unexpected response from the server. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while registering. Please try again.");
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="registration-container">
      <nav className="registration-navbar navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="#">
          RevHire Registration
        </a>
      </nav>

      <div className="registration-hero-section">
        <div className="registration-hero-text">
          <img id="registration-logo" src={logo} alt="RevHire Logo" />
          <h2 className="registration-title">Create Your Employer Account</h2>
          <p className="registration-description">
            Fill in the details below to register as an Employer.
          </p>
        </div>
        <div className="registration-form-container">
          <img src={heroImage} alt="Hero" className="img-fluid registration-hero-image" />
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                className="form-control"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
              {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <button type="submit" className="custom-button btn">
              Register
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
      
      <footer className="registration-footer">
        <p>&copy; 2024 RevHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerRegistration;