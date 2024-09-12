import React, { useState } from "react";
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
import { jobs, jobSeekers } from "../JobSeeker/JobDummyData";
// import ProfileComponent from "./ProfileComponent";

const currentJobSeeker = jobSeekers[0];

const JobPortalDashBoard = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [jobTypeInput, setJobTypeInput] = useState("");
  const [salaryRangeInput, setSalaryRangeInput] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [notEligibleMessage, setNotEligibleMessage] = useState("");

  const companyLogos = [com1, com2, com3, com4, com5, com6, com7, com8];

  const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * companyLogos.length);
    return companyLogos[randomIndex];
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (categoryInput) {
      filtered = filtered.filter((job) =>
        job.category.toLowerCase().includes(categoryInput.toLowerCase())
      );
    }
    if (jobTypeInput) {
      filtered = filtered.filter((job) =>
        job.employmentType.toLowerCase().includes(jobTypeInput.toLowerCase())
      );
    }
    if (salaryRangeInput) {
      const userSalary = parseInt(salaryRangeInput.replace(/[^\d]/g, ""));
      filtered = filtered.filter((job) => {
        const [minSalary, maxSalary] = job.salary
          .split("-")
          .map((range) => parseInt(range.replace(/[^\d]/g, "")));
        return userSalary >= minSalary && userSalary <= maxSalary;
      });
    }

    setFilteredJobs(filtered);
    setShowAllJobs(false);
  };

  const showAllJobsHandler = () => {
    setFilteredJobs(jobs);
    setShowAllJobs(true);
  };

  const handleKnowMoreClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
    setNotEligibleMessage("");
  };

  const handleApplyClick = () => {
    if (selectedJob) {
      // Parse job seeker's experience
      const jobSeekerExperience = parseInt(
        currentJobSeeker.experience.split(" ")[0]
      );

      // Parse job's experience range
      const [jobMinExperience, jobMaxExperience] = selectedJob.experience
        .split(" - ")
        .map((exp) => parseInt(exp));

      // Check if job seeker's experience falls within the job's range
      const experienceMatch =
        jobSeekerExperience >= jobMinExperience &&
        jobSeekerExperience <= jobMaxExperience;

      // Check skills match
      const skillsMatch = selectedJob.skills.every((skill) =>
        currentJobSeeker.skills.includes(skill)
      );

      // Parse job's year of passing range
      const [jobStartYear, jobEndYear] = selectedJob.yearOfPassing
        .split(" - ")
        .map((year) => parseInt(year.trim()));

      // Check if job seeker's year of passing is within the job's range
      const yearOfPassingMatch =
        currentJobSeeker.yearOfPassing >= jobStartYear &&
        currentJobSeeker.yearOfPassing <= jobEndYear;

      if (experienceMatch && skillsMatch && yearOfPassingMatch) {
        alert("Application submitted successfully!");
      } else {
        setNotEligibleMessage("You are not eligible to apply for this job.");
      }
    }
  };

  const handleCloseJobDetails = () => {
    setShowJobDetails(false);
  };

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 8);

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
            <a href="#jobs" onClick={showAllJobsHandler}>
              All Jobs
            </a>
          </li>
          <li>
            <a href="#">My jobs</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
        </ul>
        {/* <div className="navbar-profile">
          <img src={ProfileComponent} alt="Profile" className="profile-pic" />
        </div> */}
      </nav>

      <header className="job-portal-header">
        <h1>Find your dream job now!</h1>
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
            <h3>{job.title}</h3>
            <p>{job.category}</p>
            <p>{job.employmentType}</p>
            <p>Salary: {job.salary}</p>
            <p>Experience: {job.experience}</p>
            <button
              onClick={() => handleKnowMoreClick(job)}
              className="knowmore"
            >
              Know More
            </button>
          </div>
        ))}
      </div>

      {showJobDetails && (
        <div className="job-details-card">
          {selectedJob && (
            <>
              <button onClick={handleCloseJobDetails} className="close-button">
                Close
              </button>
              <h2>{selectedJob.title}</h2>
              <p>
                <strong>Category:</strong> {selectedJob.category}
              </p>
              <p>
                <strong>Employment Type:</strong> {selectedJob.employmentType}
              </p>
              <p>
                <strong>Salary:</strong> {selectedJob.salary}
              </p>
              <p>
                <strong>Experience:</strong> {selectedJob.experience}
              </p>
              <p>
                <strong>Skills:</strong> {selectedJob.skills.join(", ")}
              </p>
              <p>
                <strong>Year of Passing:</strong> {selectedJob.yearOfPassing}
              </p>
              <p>
                <strong>Qualification:</strong> {selectedJob.qualification}
              </p>
              <p>
                <strong>Shifts:</strong> {selectedJob.shifts}
              </p>
              <p>
                <strong>Required Percentage:</strong>{" "}
                {selectedJob.requiredPercentage}%
              </p>
              <button className="apply-button" onClick={handleApplyClick}>
                Apply Now
              </button>
              {notEligibleMessage && (
                <p className="error-message">{notEligibleMessage}</p>
              )}
            </>
          )}
        </div>
      )}
      <footer className="job-portal-footer">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobPortalDashBoard;
