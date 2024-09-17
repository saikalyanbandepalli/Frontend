import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api'; 
import '../Styles/ResumeView.css';

const ViewResume = () => {
  const { userId } = useParams();
  const [resumeDetails, setResumeDetails] = useState(null);
  const navigate = useNavigate(); // Import useNavigate for navigation

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resumes/user/${userId}`);
        setResumeDetails(response.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    fetchResume();
  }, [userId]);

  if (!resumeDetails) {
    return <div>Loading...</div>;
  }

  const { user, skills, education, experience, languages, summary } = resumeDetails;

  const calculateExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return { years, months };
  };

  return (
    <div className="resume-container">
      <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
      <div className="resume-view">
        <h2>Resume</h2>

        <div className="contact-info">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>

        <h3 className="summary">Summary</h3>
        <p>{summary.summaryText}</p>

        <h3 className="education">Education</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <p>{edu.degree} from {edu.institution} ({edu.startYear} - {edu.endYear})</p>
          </div>
        ))}

        <h3 className="skills">Skills</h3>
        {skills.map((skill, index) => (
          <div key={index}>
            <p>{skill.skillName}: {skill.skillDescription}</p>
          </div>
        ))}

        <h3 className="experience">Experience</h3>
        {experience.map((exp, index) => {
          const { years, months } = calculateExperience(exp.startDate, exp.endDate);
          return (
            <div key={index}>
              <p>{exp.jobPosition} at {exp.officeName} ({years} years and {months} months)</p>
            </div>
          );
        })}

        <h3 className="languages">Languages</h3>
        {languages.map((lang, index) => (
          <div key={index}>
            <p>{lang.languageName} - {lang.proficiency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResume;
