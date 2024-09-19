import React, { useState, useEffect } from "react";
import "../Styles/JobPortalDashBoard.css";
import logo from "../images/revhire_logo.png";
import api from "../../config/api";
import { useParams, useNavigate } from "react-router-dom";
// import JobSearchSection from "./JobSearchSection";
import JobListings from "./JobListings";
import JobDetailsCard from "./JobDetailsCard";
import ProfileDetailsCard from "./ProfileDetailsCard";
import Navbar from "./Navbar";
import com1 from "../images/com1_valid.jpg";
import com2 from "../images/com2_valid.jpg";
import com3 from "../images/com3_valid.jpg";
import com4 from "../images/com4_valid.jpg";
import com5 from "../images/com5_valid.jpg";
import com6 from "../images/com6_valid.jpg";
import com7 from "../images/com7_valid.jpg";
import com8 from "../images/com8_valid.jpg";

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
  const [userName, setUserName] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);

  const companyLogos = [com1, com2, com3, com4, com5, com6, com7, com8];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get(`/jobs/not-applied/${userId}`);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        alert("Error fetching jobs:", error);
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await api.get(`/jobs/user/${userId}/applications`);
        const appliedJobData = response.data.map((application) => ({
          ...application.job,
          status: application.status,
        }));

        setAppliedJobs(appliedJobData);
      } catch (error) {
        alert("Error fetching applied jobs:", error);
        console.error("Error fetching applied jobs:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.firstName + " " + response.data.lastName);
      } catch (error) {
        alert("Error fetching user details:", error);
        console.error("Error fetching user details:", error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
    fetchUserDetails();
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

  const handleLogout = () => {
    navigate("/login");
  };

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

  const handleProfileClick = async () => {
    if (!showDetails) {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        alert("Error fetching user details:", error);
        console.error("Error fetching user details:", error);
      }
    }
    setShowDetails(!showDetails);
  };

  const handleApplyClick = async () => {
    if (selectedJob) {
      try {
        const jobId = selectedJob.jobId;
        await api.post(`jobs/${jobId}/apply/${userId}`, null, {
          params: {
            jobid: jobId,
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
      <Navbar
        logo={logo}
        handleLogout={handleLogout}
        handleProfileClick={handleProfileClick}
        navigate={navigate}
        userId={userId}
        showAllJobsHandler={showAllJobsHandler}
      />

      <header className="job-portal-header">
        <h1>Find Your Dream Job Now!</h1>
        <p>
          <b>
            Welcome, <strong>{userName} </strong>!
          </b>
        </p>
        <p>Select a Job category and we'll show you relevant jobs for it!</p>
      </header>

      {/* <JobSearchSection
        categoryInput={categoryInput}
        companyInput={companyInput}
        jobTypeInput={jobTypeInput}
        salaryRangeInput={salaryRangeInput}
        handleCategoryChange={(e) => setCategoryInput(e.target.value)}
        handleCompanyChange={(e) => setCompanyInput(e.target.value)}
        handleJobTypeChange={(e) => setJobTypeInput(e.target.value)}
        handleSalaryRangeChange={(e) => setSalaryRangeInput(e.target.value)}
        filterJobs={filterJobs}
        categorySuggestions={categorySuggestions}
        companySuggestions={companySuggestions}
        handleSuggestionClick={handleSuggestionClick}
        handleCompanySuggestionClick={handleCompanySuggestionClick}
      /> */}

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

      <JobListings
        displayedJobs={displayedJobs}
        getRandomLogo={() =>
          companyLogos[Math.floor(Math.random() * companyLogos.length)]
        }
        handleKnowMoreClick={(job) => {
          setSelectedJob(job);
          setShowJobDetails(true);
        }}
        isJobApplied={isJobApplied}
      />

      {showJobDetails && selectedJob && (
        <JobDetailsCard
          job={selectedJob}
          handleApplyClick={handleApplyClick}
          handleClose={handleCloseJobDetails}
          isJobApplied={isJobApplied}
        />
      )}

      {showDetails && userDetails && (
        <ProfileDetailsCard
          userDetails={userDetails}
          handleClose={handleProfileClick}
        />
      )}
      <footer className="job-portal-footer">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobPortalDashBoard;
