import React from "react";
import "../Styles/JobPortalDashBoard.css";

const JobListings = ({
  displayedJobs,
  getRandomLogo,
  handleKnowMoreClick,
  isJobApplied,
}) => {
  return (
    <div className="job-listings">
      {displayedJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        displayedJobs.map((job) => (
          <div key={job.jobId} className="job-card">
            <img
              src={getRandomLogo()}
              alt="Company Logo"
              className="company-logo"
            />
            <h2>{job.jobTitle}</h2>
            <p>Company: {job.companyName}</p>
            <p>Job Type: {job.jobType}</p>
            <p>Salary Range: {job.salaryRange}</p>{" "}
            <p>Experience: {job.experienceRequired}</p>
            <button
              onClick={() => handleKnowMoreClick(job)}
              className="knowmore"
            >
              {isJobApplied(job.jobId) ? "Applied" : "Know More"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
