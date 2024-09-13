import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/EmployerDashboard.css";
import logo from "../images/revhire_logo.png";
import jobImage from "../images/jobimage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import api from "../../config/api";

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
  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddCategoryClick = () => {
    console.log("Add Category button clicked");
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
    <div className="dashboard-container">
      <nav className="top-navbar">
        <div className="top-navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="top-navbar-time">
          <Clock />
        </div>
        <div className="top-navbar-profile">
          <div className="profile-info">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="profile-icon"
              onClick={handleProfileClick} 
            />
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <nav className="secondary-navbar">
        <button>Add Jobs</button>
        <button onClick={handleAddCategoryClick}>Add Category</button>
        <button>My Jobs</button>
      </nav>

      <div className="image-container">
        <img src={jobImage} alt="Job" className="job-image" />
        

        {showDetails && employerDetails && (
          <div className="details-box">
            <h2>{employerDetails.employername}'s Profile</h2>
            <p><strong>Name:</strong> {employerDetails.employername}</p>
            <p><strong>Email:</strong> {employerDetails.email}</p>
            <p><strong>Contact Number:</strong> {employerDetails.contactNumber}</p>
            <p><strong>Address:</strong> {employerDetails.address}</p>
          </div>
        )}
      </div>


      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EmployerDashboard;