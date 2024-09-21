import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/EmployerDashboard.css";
import logo from "../images/revhire_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployerDetails, setEditedEmployerDetails] = useState({
    employerName: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  useEffect(() => {
    fetchJobs();
    console.log(employerDetails);
    if (employerDetails) {
      console.log("Received user data:", employerDetails);
    } else {
      console.log("No user data received.");
    }
  }, [employerDetails]);

  useEffect(() => {
    if (!employerDetails) {
      fetchEmployerDetails();
    }
  }, [employerDetails]);

  const handleLogout = () => {
    const logout = window.confirm("Are you want to logout");
    if(logout){
      navigate('/login');
    }
    
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
    setShowResetPassword(false);
    setShowDetails(false);
  };

  const handleAddJobsClick = () => {
    setShowJobForm(true);
    setShowCategoryManager(false);
    setShowHome(false);
    setShowJobList(false);
    setShowResetPassword(false);
    setShowDetails(false);
  };

  const handleMyJobsClick = () => {
    setShowJobList(true);
    setShowJobForm(false);
    setShowCategoryManager(false);
    setShowHome(false);
    setShowResetPassword(false);
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
      setEditedEmployerDetails({
        employerName: response.data.employerName,
        email: response.data.email,
        contactNumber: response.data.contactNumber,
        address: response.data.address,
      });
      setError(null);
      setProfileImage(response.data.profilePictureUrl);
    } catch (err) {
      setError('Failed to fetch employer details.');
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await api.get(`/jobs/employer/${employerId}`);
      setJobs(response.data || []); // Ensure jobs is an array
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]); // Set an empty array in case of an error
    }
  };

  const handleProfileClick = () => {
    if (!showDetails) {
      fetchEmployerDetails();
    }
    setShowDetails(!showDetails);
  };

  const handleSearch = () => {
    fetchJobs();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setPreviewImage(null);
  };

    // Handle input changes for editing profile
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedEmployerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };

      // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/employers/update/${employerId}`, editedEmployerDetails);
      setEmployerDetails(response.data); // Update the state with new data
      setIsEditing(false); // Exit edit mode
      setShowDetails(false); // Close profile modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter(job =>
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase())) &&
        (job.experienceRequired && job.experienceRequired.toLowerCase().includes(searchExperience.toLowerCase())) &&
        (job.salaryRange && job.salaryRange.toLowerCase().includes(searchSalary.toLowerCase()))
      )
    : [];

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

        {showJobForm && <JobForm />}
        {showCategoryManager && <CategoryManager />}
        {showJobList && <JobList />}
        {showResetPassword && <ResetPasswordForm />}
        
        {showDetails && (
        <div id="employer-profile-overlay">
          <div className="employer-profile-box">
            <span className="employer-profile-close" onClick={() => setShowDetails(false)}>
              &times;
            </span>
            {employerDetails && (
              <>
                <div className="employer-profile-picture-container">
                  {employerDetails.profilePictureUrl ? (
                   <img
                     src={employerDetails.profilePictureUrl}
                     alt="Profile"
                     className="profile-picture"
                   />
                  ) : (
                     <FontAwesomeIcon
                     icon={faUserCircle}
                     className="default-profile-icon"
                     size="6x" 
                   />
                 )}
                </div>
                <div className="employer-profile-details">
                  {!isEditing ? (
                    <>
                      <h2>{employerDetails.employerName}'s Profile</h2>
                      <p>
                        <strong>Name:</strong> {employerDetails.employerName}
                      </p>
                      <p>
                        <strong>Email:</strong> {employerDetails.email}
                      </p>
                      <p>
                        <strong>Contact Number:</strong> {employerDetails.contactNumber}
                      </p>
                      <p>
                        <strong>Address:</strong> {employerDetails.address}
                      </p>
                      <button className="employer-edit-button" onClick={handleEditClick}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                      </button>
                    </>
                  ) : (
                    <form id="employer-edit-form" onSubmit={handleProfileUpdate}>
                      <h2>Edit Profile</h2>
                      <div>
                        <label htmlFor="employerName">Name:</label>
                        <input
                          type="text"
                          name="employerName"
                          value={editedEmployerDetails.employerName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={editedEmployerDetails.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                          type="text"
                          name="contactNumber"
                          value={editedEmployerDetails.contactNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          name="address"
                          value={editedEmployerDetails.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit" className="save-changes-button">Save Changes</button>
                      <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      </div>
      <footer className="employerdashboard-footer" style={{ backgroundColor: '#6300b3' }}>
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerDashboard;
