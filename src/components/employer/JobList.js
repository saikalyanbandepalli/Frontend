import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import '../Styles/JobList.css';
import { useSelector } from 'react-redux';

const JobList = () => {
  const employerId = useSelector((state) => state.employer.employerId); 

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});
  const [applicantStatuses, setApplicantStatuses] = useState({});
  const [resumeDetails, setResumeDetails] = useState(null); // State to hold resume data

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get(`/jobs/employer/${employerId}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewApplicants = async (jobId) => {
    try {
      const job = jobs.find((job) => job.jobId === jobId);
      setSelectedJob(job);
      setApplicants(job.applicants);

      await fetchApplicantStatuses(job.applicants, jobId);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const fetchApplicantStatuses = async (applicants, jobId) => {
    const statusMap = {};
    for (const applicant of applicants) {
      try {
        const response = await api.get(`/jobs/user/${applicant.userId}/applications`);
        const applicationStatus = response.data.find(application => application.job.jobId === jobId)?.status;
        statusMap[applicant.userId] = applicationStatus || 'Pending';
      } catch (error) {
        console.error('Error fetching applicant status:', error);
      }
    }
    setApplicantStatuses(statusMap);
  };

  const handleStatusChange = (userId, newStatus) => {
    setStatusUpdate((prevStatus) => ({
      ...prevStatus,
      [userId]: newStatus,
    }));
  };

  const handleViewResume = async (userId) => {
    try {
      const response = await api.get(`/resumes/user/${userId}`); // API call to get resume details
      setResumeDetails(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const handleUpdateStatus = async (userId, jobId) => {
    const updatedStatus = statusUpdate[userId];
    try {
      await api.put(`/applications/updateStatus/${userId}/${jobId}?status=${updatedStatus}`);
      await fetchApplicantStatuses(applicants, jobId);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const paginate = (items, pageNumber, itemsPerPage) => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const paginatedJobs = paginate(jobs, currentPage, jobsPerPage);

  return (
    <div id="job-list-container">
      <h1 className="job-list-title">Job Listings</h1>

      <table id="job-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Job Description</th>
            <th>Skills Required</th>
            <th>Category</th>
            <th>Job Type</th>
            <th>Salary Range</th>
            <th>Experience Required</th>
            <th>Location</th>
            <th>Post Date</th>
            <th>End Date</th>
            <th>Applicants Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedJobs.map((job, index) => (
            <tr key={job.jobId}>
              <td>{(currentPage - 1) * jobsPerPage + index + 1}</td>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.jobDescription}</td>
              <td>{job.skillsRequired}</td>
              <td>{job.category.categoryName}</td>
              <td>{job.jobType}</td>
              <td>{job.salaryRange}</td>
              <td>{job.experienceRequired}</td>
              <td>{job.location}</td>
              <td>{new Date(job.postDate).toLocaleDateString()}</td>
              <td>{new Date(job.endDate).toLocaleDateString()}</td>
              <td>{job.applicants.length}</td>
              <td>
                <button className="view-applicants-btn" onClick={() => handleViewApplicants(job.jobId)}>View Applicants</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="pagination-controls">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedJob && (
        <div id="applicants-modal">
          <h2>Applicants for {selectedJob.jobTitle}</h2>
          <button className="close-modal-btn" onClick={() => setSelectedJob(null)}>Close</button>

          <table id="applicants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <tr key={applicant.userId}>
                    <td>{applicant.firstName} {applicant.lastName}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.contactNumber}</td>
                    <td>{applicant.address}</td>
                    <td>
                      <button onClick={() => handleViewResume(applicant.userId)}>View Resume</button>
                    </td>
                    <td>{applicantStatuses[applicant.userId] || "Pending"}</td>
                    <td>
                      {applicantStatuses[applicant.userId] !== 'WITHDRAWN' && (
                        <>
                          <select
                            value={statusUpdate[applicant.userId] || applicantStatuses[applicant.userId] || "Pending"}
                            onChange={(e) => handleStatusChange(applicant.userId, e.target.value)}
                          >
                            <option value="REJECTED">Rejected</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                          </select>
                          <button onClick={() => handleUpdateStatus(applicant.userId, selectedJob.jobId)}>Update Status</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No applicants yet.</td>
                </tr>
              )}
            </tbody>
          </table>

          {resumeDetails && (
            <div id="resume-modal">
              <h3>Resume Details for {resumeDetails.user.firstName} {resumeDetails.user.lastName}</h3>
              <p>Email: {resumeDetails.user.email}</p>
              <p>Contact Number: {resumeDetails.user.contactNumber}</p>
              <p>Address: {resumeDetails.user.address}</p>
              <h4>Skills</h4>
              <ul>
                {resumeDetails.skills.map((skill) => (
                  <li key={skill.skillId}>{skill.skillName}: {skill.skillDescription}</li>
                ))}
              </ul>
              <h4>Education</h4>
              <ul>
                {resumeDetails.education.map((edu) => (
                  <li key={edu.educationId}>{edu.degree} from {edu.institution} ({edu.startYear} - {edu.endYear})</li>
                ))}
              </ul>
              <h4>Experience</h4>
              <ul>
                {resumeDetails.experience.map((exp) => (
                  <li key={exp.experienceId}>{exp.jobPosition} at {exp.officeName} ({new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'})</li>
                ))}
              </ul>
              <h4>Languages</h4>
              <ul>
                {resumeDetails.languages.map((lang) => (
                  <li key={lang.languageId}>{lang.languageName} - {lang.languageProficiency}</li>
                ))}
              </ul>
              <button className="close-resume-btn" onClick={() => setResumeDetails(null)}>Close Resume</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;
