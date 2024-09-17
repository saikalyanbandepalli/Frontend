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
import { useSelector } from 'react-redux';
import ResetPasswordForm from "./ResetPasswordEmployer";

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
  const employerId = useSelector((state) => state.employer.employerId);
  const [employerDetails, setEmployerDetails] = useState(location.state?.user || null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showJobList, setShowJobList] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchExperience, setSearchExperience] = useState("");
  const [searchSalary, setSearchSalary] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

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
    setShowResetPassword(false);
    fetchJobs();
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

  const handleResetPasswordClick = () => {
    setShowResetPassword(true);
    setShowJobForm(false);
    setShowCategoryManager(false);
    setShowHome(false);
    setShowJobList(false);
    setShowDetails(false);
  };  

  const fetchEmployerDetails = async () => {
    try {
      const response = await api.get(`/employers/${employerId}`);
      setEmployerDetails(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employer details.');
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await api.get(`/jobs/employer/${employerId}`);
      console.log('Fetched Jobs:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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

  const handleSearch = () => {
    fetchJobs();
  };

  const filteredJobs = jobs.filter(job =>
    (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase())) &&
    (job.experienceRequired && job.experienceRequired.toLowerCase().includes(searchExperience.toLowerCase())) &&
    (job.salaryRange && job.salaryRange.toLowerCase().includes(searchSalary.toLowerCase()))
  );

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
        <button onClick={handleResetPasswordClick}>Reset Password</button>
      </nav>

      <div className="employerdashboard-main-content">
        {showHome && employerDetails && (
          <div className="employerdashboard-home-container">
            <h2>Welcome, {employerDetails.employerName}!</h2>
            <p>Here you can manage your job postings, categories, and much more.</p>

            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Job Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Experience"
                value={searchExperience}
                onChange={(e) => setSearchExperience(e.target.value)}
              />
              <input
                type="text"
                placeholder="Salary"
                value={searchSalary}
                onChange={(e) => setSearchSalary(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="job-cards-container">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div className="card" key={job.id}>
                    <div className="card-body">
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
                      <p className="card-text">{job.jobDescription}</p>
                      <div className="job-details">
                        <p className="job-detail"><strong>Experience Required:</strong> {job.experienceRequired}</p>
                        <p className="job-detail"><strong>Salary Range:</strong> {job.salaryRange}</p>
                        <p className="job-detail"><strong>Job Type:</strong> {job.jobType}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No jobs found.</p>
              )}
            </div>
          </div>
        )}

      {(showJobForm || showCategoryManager || showJobList || showResetPassword) && (
        <div className="employerdashboard-form-container">
        {showJobForm ? <JobForm /> :
        showCategoryManager ? <CategoryManager /> :
        showJobList ? <JobList /> :
        showResetPassword && <ResetPasswordForm />}
      </div>
    )}

        {showDetails && employerDetails && (
          <div className="employerdashboard-modal">
            <div className="employerdashboard-modal-content">
              <span className="employerdashboard-close" onClick={() => setShowDetails(false)}>&times;</span>
              <h2>{employerDetails.employerName}'s Profile</h2>
              <p><strong>Name:</strong> {employerDetails.employerName}</p>
              <p><strong>Email:</strong> {employerDetails.email}</p>
              <p><strong>Contact Number:</strong> {employerDetails.contactNumber}</p>
              <p><strong>Address:</strong> {employerDetails.address}</p>
            </div>
          </div>
        )}

        {error && <p className="employerdashboard-error">{error}</p>}
      </div>

      <footer className="login-footer">
        <p>&copy; 2024 RevHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerDashboard;
