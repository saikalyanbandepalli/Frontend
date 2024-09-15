import React, { useState, useEffect } from "react";
import "../Styles/JobPortalDashBoard.css";
import logo from "../images/revhire_logo.png";
import com1 from "../images/com1_valid.jpg";
import com2 from "../images/com2_valid.jpg";
import com3 from "../images/com3_valid.jpg";
import com4 from "../images/com4_valid.jpg";
import com5 from "../images/com5_valid.jpg";
import com6 from "../images/com6_valid.jpg";
import com7 from "../images/com7_valid.jpg";
import com8 from "../images/com8_valid.jpg";
import api1 from "../../config/api1";
import { useParams, useNavigate } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobPortalDashBoard = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [jobTypeInput, setJobTypeInput] = useState("");
  const [salaryRangeInput, setSalaryRangeInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);

  const companyLogos = [com1, com2, com3, com4, com5, com6, com7, com8];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryInput(value);

    if (value.length > 0) {
      const filteredCategories = jobs
        .map((job) => job.jobTitle)
        .filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        );
      setCategorySuggestions([...new Set(filteredCategories)]);
    } else {
      setCategorySuggestions([]);
    }
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setCompanyInput(value);

    if (value.length > 0) {
      const filteredCompanies = jobs
        .map((job) => job.companyName)
        .filter((company) =>
          company.toLowerCase().includes(value.toLowerCase())
        );
      setCompanySuggestions([...new Set(filteredCompanies)]);
    } else {
      setCompanySuggestions([]);
    }
  };

  const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * companyLogos.length);
    return companyLogos[randomIndex];
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfileClick = async () => {
    if (!showDetails) {
      try {
        const response = await api1.get(`/appliedJobs/user/${userId}`);
        if (response.data.length > 0) {
          const user = response.data[0]?.user;
          setUserDetails(user);
        } else {
          console.warn("No user details found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api1.get("/jobs/all");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await api1.get(`/appliedJobs/user/${userId}`);
        const appliedJobData = response.data.map((job) => job.job);
        setAppliedJobs(appliedJobData);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, [userId]);

  const filterJobs = () => {
    let filtered = jobs;

    if (categoryInput) {
      filtered = filtered.filter((job) =>
        job.jobTitle.toLowerCase().includes(categoryInput.toLowerCase())
      );
    }
    if (companyInput) {
      filtered = filtered.filter((job) =>
        job.companyName.toLowerCase().includes(companyInput.toLowerCase())
      );
    }
    if (jobTypeInput) {
      filtered = filtered.filter((job) =>
        job.jobType.toLowerCase().includes(jobTypeInput.toLowerCase())
      );
    }
    if (salaryRangeInput) {
      filtered = filtered.filter((job) => {
        const salaryRange = job.salaryRange.toLowerCase();
        return salaryRange.includes(salaryRangeInput.toLowerCase());
      });
    }

    setFilteredJobs(filtered);
    setShowAllJobs(false);
  };

  const showAllJobsHandler = () => {
    setFilteredJobs(jobs);
    setShowAllJobs(true);
    setShowAppliedJobs(false);
  };

  const showAppliedJobsHandler = () => {
    setFilteredJobs(appliedJobs);
    setShowAppliedJobs(true);
    setShowAllJobs(false);
  };

  const handleKnowMoreClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApplyClick = async () => {
    if (selectedJob) {
      try {
        await api1.post("/appliedJobs/apply", null, {
          params: {
            jobId: selectedJob.jobId,
            jobSeekerId: userId,
          },
        });
        alert("Application submitted successfully!");
        setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, selectedJob]);
      } catch (error) {
        const message = error.response?.data || "An unexpected error occurred.";
        alert(`Application failed: ${message}`);
      }
    }
  };

  const isJobApplied = (jobId) =>
    appliedJobs.some((job) => job.jobId === jobId);

  const handleCloseJobDetails = () => {
    setShowJobDetails(false);
  };

  const displayedJobs = showAppliedJobs
    ? appliedJobs
    : showAllJobs
    ? filteredJobs
    : filteredJobs.slice(0, 8);

  const handleSuggestionClick = (suggestion) => {
    setCategoryInput(suggestion);
    setCategorySuggestions([]);
  };

  const handleCompanySuggestionClick = (suggestion) => {
    setCompanyInput(suggestion);
    setCompanySuggestions([]);
  };

  return (
    <div className="job-portal-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Job Portal Logo" className="jobportlogo" />
        </div>
        <ul className="navbar-links">
          <li>
            <a href={`/JobPortal/jobseeker/${userId}`}>Home</a>
          </li>
          <li>
            <a onClick={showAllJobsHandler} className="all-jobs-button">
              All Jobs
            </a>
          </li>
          <li>
            <a onClick={showAppliedJobsHandler}>My Jobs</a>
          </li>
          <li>
            <a onClick={() => navigate(`/ResumeForm`)}>Resume</a>
          </li>
        </ul>
        <div className="top-navbar-profile1">
          <div className="profile-info">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="profile-icon"
              onClick={handleProfileClick}
            />
            <button
              className="employerdashboard-logout-button1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <header className="job-portal-header">
        <h1>Find Your Dream Job Now!</h1>
        <p>Select a Job category and we'll show you relevant jobs for it!</p>
      </header>

      <div className="job-search-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Job Title"
            value={categoryInput}
            onChange={handleCategoryChange}
          />
          {categorySuggestions.length > 0 && (
            <ul className="suggestion-list">
              {categorySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Company Name"
            value={companyInput}
            onChange={handleCompanyChange}
          />
          {companySuggestions.length > 0 && (
            <ul className="suggestion-list">
              {companySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleCompanySuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-group1">
          <select
            value={jobTypeInput}
            onChange={(e) => setJobTypeInput(e.target.value)}
          >
            <option value="">Select Job Type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>

        <div className="input-group1">
          <select
            value={salaryRangeInput}
            onChange={(e) => setSalaryRangeInput(e.target.value)}
          >
            <option value="">Select Salary Range</option>
            <option value="ONE_TO_THREE_LPA">1-3 LPA</option>
            <option value="THREE_TO_FIVE_LPA">3-5 LPA</option>
            <option value="FIVE_TO_SEVEN_LPA">5-7 LPA</option>
            <option value="SEVEN_TO_TEN_LPA">7-10 LPA</option>
            <option value="TWENTY_FIVE_PLUS_LPA">25+ LPA</option>
          </select>
        </div>

        <button onClick={filterJobs}>Search</button>
      </div>

      <div className="job-listings">
        {displayedJobs.map((job, index) => (
          <div key={index} className="job-card">
            <img
              src={getRandomLogo()}
              alt="Company Logo"
              className="company-logo"
            />
            <h3>{job.jobTitle}</h3>
            <p>Company: {job.companyName}</p>
            <p>Job Type: {job.jobType}</p>
            <p>Salary Range: {job.salaryRange}</p>
            <p>Experience: {job.experienceRequired}</p>

            {isJobApplied(job.jobId) ? (
              <button
                className="apply-button"
                onClick={() => handleKnowMoreClick(job)}
              >
                Applied
              </button>
            ) : (
              <button
                onClick={() => handleKnowMoreClick(job)}
                className="knowmore"
              >
                Know More
              </button>
            )}
          </div>
        ))}
      </div>

      {showJobDetails && selectedJob && (
        <div className="job-details-card">
          <button onClick={handleCloseJobDetails} className="close-button">
            Close
          </button>
          <h2>{selectedJob.jobTitle}</h2>
          <p>
            <strong>Company:</strong> {selectedJob.companyName}
          </p>
          <p>
            <strong>Description:</strong> {selectedJob.jobDescription}
          </p>
          <p>
            <strong>Category:</strong> {selectedJob.category.categoryName}
          </p>
          <p>
            <strong>Salary:</strong> {selectedJob.salaryRange}
          </p>
          <p>
            <strong>Experience Required:</strong>{" "}
            {selectedJob.experienceRequired}
          </p>
          <p>
            <strong>Location:</strong> {selectedJob.location}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(selectedJob.endDate).toLocaleDateString()}
          </p>
          {!isJobApplied(selectedJob.jobId) && (
            <button className="apply-button" onClick={handleApplyClick}>
              Apply Now
            </button>
          )}
        </div>
      )}
      {showDetails && userDetails && (
        <div className="profile-details-card">
          <button onClick={handleProfileClick} className="close-button11">
            Close
          </button>
          <h2>User Profile</h2>
          <p>
            <strong>Name:</strong> {userDetails.userName}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <p>
            <strong>Date of Joining:</strong> {userDetails.yearOfPassing}
          </p>
          <p>
            <strong>Experience:</strong> {userDetails.experience}
          </p>
        </div>
      )}
      <footer className="job-portal-footer">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobPortalDashBoard;
