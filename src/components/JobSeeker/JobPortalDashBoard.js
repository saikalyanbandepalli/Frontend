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
import { useLocation } from "react-router-dom";

const JobPortalDashBoard = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [jobTypeInput, setJobTypeInput] = useState("");
  const [salaryRangeInput, setSalaryRangeInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const location = useLocation();
  const { userDetails } = location.state || {}; // Retrieve userDetails from the passed location state

  const companyLogos = [com1, com2, com3, com4, com5, com6, com7, com8];

  // Randomly select a company logo
  const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * companyLogos.length);
    return companyLogos[randomIndex];
  };

  // Fetch jobs when the component is mounted
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
    fetchJobs();
  }, []);

  // Filter jobs based on user input
  const filterJobs = () => {
    let filtered = jobs;

    if (categoryInput) {
      filtered = filtered.filter((job) =>
        job.category.categoryName
          .toLowerCase()
          .includes(categoryInput.toLowerCase())
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

  // Show all jobs without filtering
  const showAllJobsHandler = () => {
    setFilteredJobs(jobs);
    setShowAllJobs(true);
  };

  // Show detailed information for a selected job
  const handleKnowMoreClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  // Apply for a job
  const handleApplyClick = async () => {
    if (selectedJob && userDetails) {
      try {
        await api1.post("/appliedJobs/apply", null, {
          params: {
            jobId: selectedJob.jobId,
            jobSeekerId: userDetails.id,
          },
        });
        alert("Application submitted successfully!");
      } catch (error) {
        const message = error.response?.data || "An unexpected error occurred.";
        alert(`Application failed: ${message}`);
      }
    }
  };

  // Close job details modal
  const handleCloseJobDetails = () => {
    setShowJobDetails(false);
  };

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 8); // Limit job cards to 8 if not showing all jobs

  return (
    <div className="job-portal-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Job Portal Logo" className="jobportlogo" />
        </div>
        <ul className="navbar-links">
          <li>
            <a href="/jobportal">Home</a>
          </li>
          <li>
            <a onClick={showAllJobsHandler} className="all-jobs-button">
              All Jobs
            </a>
          </li>
          <li>
            <a href="#">My Jobs</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
        </ul>
      </nav>

      <header className="job-portal-header">
        <h1>Find Your Dream Job Now!</h1>
        <p>Select a role and we'll show you relevant jobs for it!</p>
      </header>

      <div className="job-search-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Job Category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Job Type"
            value={jobTypeInput}
            onChange={(e) => setJobTypeInput(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Salary Range"
            value={salaryRangeInput}
            onChange={(e) => setSalaryRangeInput(e.target.value)}
          />
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
            <button
              onClick={() => handleKnowMoreClick(job)}
              className="knowmore"
            >
              Know More
            </button>
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
          <button onClick={handleApplyClick} className="apply-button">
            Apply
          </button>
        </div>
      )}

      <footer className="job-portal-footer">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobPortalDashBoard;
