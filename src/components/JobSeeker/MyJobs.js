import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/api";
import "../Styles/MyJobs.css";

import com1 from "../images/com1_valid.jpg";
import com2 from "../images/com2_valid.jpg";
import com3 from "../images/com3_valid.jpg";
import com4 from "../images/com4_valid.jpg";
import com5 from "../images/com5_valid.jpg";
import com6 from "../images/com6_valid.jpg";
import com7 from "../images/com7_valid.jpg";
import com8 from "../images/com8_valid.jpg";

const companyLogos = [com1, com2, com3, com4, com5, com6, com7, com8];

const MyJobs = () => {
  const { userId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [withdrawing, setWithdrawing] = useState(false);
  const navigate = useNavigate();

  const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * companyLogos.length);
    return companyLogos[randomIndex];
  };

  useEffect(() => {
    api
      .get(`/jobs/user/${userId}/applications`)
      .then((response) => {
        const jobsWithLogos = response.data.map((job) => ({
          ...job,
          logo: getRandomLogo(),
        }));
        setJobs(jobsWithLogos);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [userId]);

  const handleKnowMoreClick = (job) => {
    console.log("Job details:", job);
  };

  const handleWithdrawClick = (jobId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to withdraw your application?"
    );

    if (isConfirmed) {
      setWithdrawing(true);
      api
        .post(`/jobs/${jobId}/withdraw/${userId}`)
        .then((response) => {
          console.log("Withdrawn successfully:", response.data);
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job.job.jobId === jobId ? { ...job, status: "WITHDRAWN" } : job
            )
          );
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Error withdrawing application:", error);
        })
        .finally(() => {
          setWithdrawing(false);
        });
    }
  };

  const handleGoBack = () => {
    navigate(`/JobPortal/jobseeker/${userId}`);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar1">
        <div className="navbar-buttons">
          <button className="navbar-button1" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="navbar-button1" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="navbar-header">
          <h1>My Jobs</h1>
        </div>
      </nav>
      <div className="my-job-listings">
        {jobs.length > 0 ? (
          jobs.map((application) => (
            <div key={application.applicationId} className="my-job-card">
              <img
                src={application.logo}
                alt="Company Logo"
                className="my-company-logo"
              />
              <h3 className="my-job-title">{application.job.jobTitle}</h3>
              <p className="my-company-name">
                Company: {application.job.companyName}
              </p>
              <p className="my-job-type">Job Type: {application.job.jobType}</p>
              <p className="my-salary-range">
                Salary Range: {application.job.salaryRange}
              </p>
              <p className="my-experience-required">
                Experience: {application.job.experienceRequired}
              </p>

              {application.status === "APPLIED" && (
                <div>
                  <button
                    className="my-status-button applied"
                    onClick={() => handleKnowMoreClick(application.job)}
                  >
                    Applied
                  </button>
                  <button
                    className="my-status-button withdraw"
                    onClick={() => handleWithdrawClick(application.job.jobId)}
                    style={{ marginLeft: "10px" }}
                    disabled={withdrawing}
                  >
                    {withdrawing ? "Withdrawing..." : "Withdraw"}
                  </button>
                </div>
              )}

              {application.status === "SHORTLISTED" && (
                <button className="my-status-button shortlisted">
                  Shortlisted
                </button>
              )}

              {application.status === "REJECTED" && (
                <button className="my-status-button rejected">Rejected</button>
              )}

              {application.status === "WITHDRAWN" && (
                <button className="my-status-button withdrawn">
                  Withdrawn
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      <footer className="job-portal-footer1">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </>
  );
};

export default MyJobs;
