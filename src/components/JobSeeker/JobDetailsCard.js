import React from "react";
import "../Styles/JobPortalDashBoard.css";

const JobDetailsCard = ({
  job,
  handleApplyClick,
  handleClose,
  isJobApplied,
}) => {
  return (
    <div className="job-details-card">
      <button onClick={handleClose} className="close-button">
        Close
      </button>
      <h2>{job.jobTitle}</h2>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Description:</strong> {job.jobDescription}
      </p>

      <p>
        <strong>Category:</strong> {job.category.categoryName}
      </p>
      <p>
        <strong>Job Type:</strong> {job.jobType}
      </p>
      <p>
        <strong>Salary:</strong> {job.salaryRange}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Experience Required:</strong> {job.experienceRequired}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}
      </p>

      <button
        onClick={handleApplyClick}
        disabled={isJobApplied(job.jobId)}
        className="apply-button"
      >
        {isJobApplied(job.jobId) ? "Applied" : "Apply"}
      </button>
    </div>
  );
};

export default JobDetailsCard;
