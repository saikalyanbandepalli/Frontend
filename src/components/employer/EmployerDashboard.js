import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/EmployerDashboard.css";
import logo from "../images/revhire_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import api from "../../config/api";
import JobForm from "./JobForm";
import CategoryManager from "./CategoryManager";
import JobList from "./JobList";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [employerDetails, setEmployerDetails] = useState(location.state?.user || null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showJobList, setShowJobList] = useState(false);
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    if (employerDetails) {
      console.log("Received user data:", employerDetails);
    } else {
      console.log("No user data received.");
    }
  }, [employerDetails]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    setShowHome(true);
    setShowJobForm(false);
    setShowCategoryManager(false);
    setShowJobList(false);
  };

  const handleAddCategoryClick = () => {
    setShowCategoryManager(true);
    setShowJobForm(false);
    setShowHome(false);
    setShowJobList(false);
    setShowDetails(false);
  };

  const handleAddJobsClick = () => {
    setShowJobForm(true);
    setShowCategoryManager(false);
    setShowHome(false);
    setShowJobList(false);
    setShowDetails(false);
  };

  const handleMyJobsClick = () => {
    setShowJobList(true);
    setShowJobForm(false);
    setShowCategoryManager(false);
    setShowHome(false);
    setShowDetails(false);
  };

  const fetchEmployerDetails = async () => {
    try {
      const response = await api.get(`/employers/${employerDetails.empolyerId}`);
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

  useEffect(() => {
    if (!employerDetails) {
      fetchEmployerDetails();
    }
  }, [employerDetails]);

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
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleAddJobsClick}>Add Jobs</button>
        <button onClick={handleAddCategoryClick}>Add Category</button>
        <button onClick={handleMyJobsClick}>My Jobs</button>
      </nav>

      <div className="employerdashboard-main-content">
        {showHome && employerDetails && (
          <div className="employerdashboard-home-container">
            <h2>Welcome, {employerDetails.employerName}!</h2>
            <p>Here you can manage your job postings, categories, and much more.</p>
            <p><strong>Email:</strong> {employerDetails.email}</p>
            <p><strong>Contact Number:</strong> {employerDetails.contactNumber}</p>
            <p><strong>Address:</strong> {employerDetails.address}</p>
          </div>
        )}

        {(showJobForm || showCategoryManager || showJobList) && (
          <div className="employerdashboard-form-container">
            {showJobForm ? <JobForm /> : showCategoryManager ? <CategoryManager /> : <JobList />}
          </div>
        )}

        {showHome && showDetails && employerDetails && (
          <div className="employerdashboard-details-box">
            <h2>{employerDetails.employerName}'s Profile</h2>
            <p><strong>Name:</strong> {employerDetails.employerName}</p>
            <p><strong>Email:</strong> {employerDetails.email}</p>
            <p><strong>Contact Number:</strong> {employerDetails.contactNumber}</p>
            <p><strong>Address:</strong> {employerDetails.address}</p>
          </div>
        )}

        {error && <p className="employerdashboard-error">{error}</p>}
      </div>
    </div>
  );
};

export default EmployerDashboard;
