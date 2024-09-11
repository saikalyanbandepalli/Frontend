import React, { useEffect, useState } from "react";
import api from "../../config/api";
import logo from "../images/revhire_logo.png";
import heroImage from "../images/landingpage_demo.png";
import { useNavigate } from "react-router-dom";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        const jobData = response.data.data;
        if (Array.isArray(jobData)) {
          setJobs(jobData);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Best jobs are coming soon..");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleLoginClick = () => {
    navigate("/jobportal");
  };

  return (
    <div className="landing-container">
      <nav className="landing-navbar navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand" href="#">
          RevHire Portal
        </a>
      </nav>

      <div className="hero-section">
        <div className="hero-text">
          <img id="landing-logo" src={logo} alt="RevHire Logo" />
          <h2 className="landing-title">Welcome to RevHire Portal</h2>
          <p className="landing-description">
            RevHire connects talented job seekers with top employers, making the
            job search and hiring process easy and efficient for everyone.
          </p>
          <button className="custom-button btn" onClick={handleLoginClick}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Hero Illustration" className="img-fluid" />
        </div>
      </div>

      <div className="landing-about">
        <h2 className="landing-about-title">About RevHire</h2>
        <p className="landing-about-description">
          RevHire is a web-based job portal designed to connect job seekers and
          employers effectively. Our platform allows job seekers to create
          resumes, search for jobs, and apply with ease, while enabling
          employers to post job requirements and manage applications seamlessly.
        </p>
        <ul className="landing-about-points list-unstyled">
          <li className="shadow-sm p-3 mb-4 bg-light rounded">
            Create and manage your professional profile and resume.
          </li>
          <li className="shadow-sm p-3 mb-4 bg-light rounded">
            Search for jobs using various filters like role, location,
            experience, and skills.
          </li>
          <li className="shadow-sm p-3 mb-4 bg-light rounded">
            Apply for unlimited jobs that match your profile.
          </li>
          <li className="shadow-sm p-3 mb-4 bg-light rounded">
            Track application status and manage your job applications.
          </li>
          <li className="shadow-sm p-3 mb-4 bg-light rounded">
            Employers can manage job postings and shortlist candidates
            efficiently.
          </li>
        </ul>
      </div>

      <div className="landing-jobs">
        <h2 className="landing-jobs-title">Job Opportunities</h2>
        {!loading && jobs.length === 0 && error && <p>{error}</p>}
        {!loading && jobs.length > 0 && (
          <div className="landing-jobs-box">
            {jobs.map((job) => (
              <div key={job.jobId} className="landing-job-posting">
                <h5>{job.jobTitle}</h5>
                <p>{job.companyName}</p>
                <p>{job.location}</p>
                <p>{job.description}</p>
              </div>
            ))}
          </div>
        )}
        {loading && <p>Loading jobs...</p>}
      </div>

      <footer className="landing-footer">
        <p>&copy; 2024 RevHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
