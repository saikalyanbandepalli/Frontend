import React, { useState } from "react";
import "../Styles/JobPortalDashBoard.css";
import logo from "../images/revhire_logo.png";

// Sample Data for Jobs
const jobs = [
  {
    title: "Java Developer",
    companyLogo: "https://logo-url.com/google",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "6 - 12 lpa",
    experience: "3 - 5 Years",
  },
  {
    title: "DBA",
    companyLogo: "https://logo-url.com/google",
    category: "DBA",
    employmentType: "Full-time",
    salary: "12 - 18 lpa",
    experience: "8 - 10 Years",
  },
  {
    title: "Senior Java Developer",
    companyLogo: "https://logo-url.com/google",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "18 - 25 lpa",
    experience: "5 - 8 Years",
  },
  {
    title: "React JS Developer",
    companyLogo: "https://logo-url.com/meta",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "5 - 8 lpa",
    experience: "1 - 3 Years",
  },
];

// Available Categories, Types, and Salary Ranges for filtering
const categories = [
  "Software Developer",
  "DBA",
  "Web Developer",
  "Data Scientist",
];
const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
const salaryRanges = [
  "6 - 12 lpa",
  "12 - 18 lpa",
  "18 - 25 lpa",
  "25 - 30 lpa",
];

const JobPortalDashBoard = () => {
  // States to manage input values and suggestions
  const [categoryInput, setCategoryInput] = useState("");
  const [jobTypeInput, setJobTypeInput] = useState("");
  const [salaryRangeInput, setSalaryRangeInput] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Filter jobs based on input
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
      filtered = filtered.filter((job) =>
        job.salary.toLowerCase().includes(salaryRangeInput.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  // Reset the filters
  const resetFilters = () => {
    setCategoryInput("");
    setJobTypeInput("");
    setSalaryRangeInput("");
    setFilteredJobs(jobs);
  };

  return (
    <div className="job-portal-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Job Portal Logo" className="jobportlogo" />
        </div>
        <ul className="navbar-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#jobs">Jobs</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search Jobs..." />
          <button>Search</button>
        </div>
      </nav>

      <header className="job-portal-header">
        <h1>Find your dream job now!</h1>
        <p>Select a role and we'll show you relevant jobs for it!</p>
      </header>

      {/* Job Search Section */}
      <div className="job-search-section">
        {/* Job Category Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Job Category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        </div>

        {/* Job Type Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Job Type"
            value={jobTypeInput}
            onChange={(e) => setJobTypeInput(e.target.value)}
          />
        </div>

        {/* Salary Range Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Select Salary Range"
            value={salaryRangeInput}
            onChange={(e) => setSalaryRangeInput(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button onClick={filterJobs}>Search</button>
      </div>

      {/* Job Listings Section */}
      <div className="job-listings">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-card">
            <img
              src={job.companyLogo}
              alt="Company Logo"
              className="company-logo"
            />
            <h3>{job.title}</h3>
            <p>{job.category}</p>
            <p>{job.employmentType}</p>
            <p>Salary: {job.salary}</p>
            <p>Experience: {job.experience}</p>
          </div>
        ))}
      </div>

      <footer className="job-portal-footer">
        <p>&copy; 2024 Online Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobPortalDashBoard;
