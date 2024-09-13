import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/EmployerDashboard.css";
import logo from "../images/revhire_logo.png";
import jobImage from "../images/jobimage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import api from "../../config/api";
import JobForm from "./JobForm"; // Import JobForm
import CategoryManager from "./CategoryManager"; // Import CategoryManager

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{time.toLocaleTimeString()}</span>;
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [employerDetails, setEmployerDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddCategoryClick = () => {
    setShowCategoryManager(true);
    setShowJobForm(false);
  };

  const handleAddJobsClick = () => {
    setShowJobForm(true);
    setShowCategoryManager(false);
  };

  const fetchEmployerDetails = async () => {
    try {
      const response = await api.get('/employers/1');
      setEmployerDetails(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employer details.');
    }
  };

  const handleProfileClick = () => {
    if (!showDetails) {
      fetchEmployerDetails();
    }
    setShowDetails(!showDetails);
  };

  return (
    <div className="employerdashboard-container">
      <nav className="employerdashboard-top-navbar">
        <div className="employerdashboard-top-navbar-logo">
          <img src={logo} alt="Job Portal Logo" />
        </div>
        <div className="employerdashboard-top-navbar-center">
          <Clock />
        </div>
        <div className="employerdashboard-top-navbar-right">
          <FontAwesomeIcon icon={faUserCircle} className="employerdashboard-profile-icon" onClick={handleProfileClick} />
          <button className="employerdashboard-logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <nav className="employerdashboard-secondary-navbar">
        <button onClick={handleAddJobsClick}>Add Jobs</button>
        <button onClick={handleAddCategoryClick}>Add Category</button>
        <button>My Jobs</button>
      </nav>

      <div className="employerdashboard-main-content">
        {showJobForm || showCategoryManager ? (
          <div className="employerdashboard-form-container">
            {showJobForm ? <JobForm /> : <CategoryManager />}
          </div>
        ) : (
          <div className="employerdashboard-image-container">
            <img src={jobImage} alt="Job" className="employerdashboard-job-image" />
            {showDetails && employerDetails && (
              <div className="employerdashboard-details-box">
                <h2>{employerDetails.employerName}'s Profile</h2>
                <p><strong>Name:</strong> {employerDetails.employerName}</p>
                <p><strong>Email:</strong> {employerDetails.email}</p>
                <p><strong>Contact Number:</strong> {employerDetails.contactNumber}</p>
                <p><strong>Address:</strong> {employerDetails.address}</p>
              </div>
            )}
          </div>
        )}
        {error && <p className="employerdashboard-error">{error}</p>}
      </div>
    </div>
  );
};

export default EmployerDashboard;
