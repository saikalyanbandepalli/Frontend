import React, { useState, useEffect } from 'react';
import api from '../../config/api'; 
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import "../Styles/ResumeForm.css";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    skills: [{ skillName: '', skillDescription: '' }],
    education: [{ degree: '', institution: '', startYear: '', endYear: '' }],
    experience: [{ jobPosition: '', officeName: '', startDate: '', endDate: '' }],
    languages: [{ languageName: '', proficiency: '' }],
    summary: { summaryText: '' },
  });

  const userIdd = useSelector((state) => state.jobseeker.jobseekerId);
  const [mode, setMode] = useState('create'); 
  const [userId, setUserId] = useState(userIdd); 
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [resumeExists, setResumeExists] = useState(false); 
  const [userName, setUserName] =  useState('');
  const [email, setEmail] =  useState('');
  const [contactNumber, setContactNumber] =  useState('');
  const [address, setAddress] =  useState('');

  console.log(userName);
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'view' || mode === 'update') {
      setLoading(true);
      api.get(`/resumes/user/${userId}`)
        .then(response => {
          setFormData(response.data);
          setResumeExists(true); 
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching the resume:', error);
          setResumeExists(false); 
          setLoading(false);
        });
    } else if (mode === 'create') {
      api.get(`/resumes/user/${userId}`)
        .then(response => {
          if (response.data && response.data.skills.length) {
            setUserName(response.data.user.userName);
            setEmail(response.data.user.email);
            setContactNumber(response.data.user.contactNumber);
            setAddress(response.data.user.address);
            setResumeExists(true);
          } else {
            setResumeExists(false);
          }
        })
        .catch(error => {
          console.error('Error checking for existing resume:', error);
          setResumeExists(false);
        });
    }
  }, [mode, userId]);

  const handleInputChange = (e, section, index, key) => {
    const value = e.target.value;
    setFormData(prevData => {
      if (section === 'summary') {
        return { ...prevData, [section]: { [key]: value } };
      }
      const updatedSection = [...prevData[section]];
      updatedSection[index][key] = value;
      return { ...prevData, [section]: updatedSection };
    });
  };

  const addSectionItem = (section) => {
    setFormData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection.push(
        section === 'skills'
          ? { skillName: '', skillDescription: '' }
          : section === 'education'
          ? { degree: '', institution: '', startYear: '', endYear: '' }
          : section === 'experience'
          ? { jobPosition: '', officeName: '', startDate: '', endDate: '' }
          : { languageName: '', proficiency: '' }
      );
      return { ...prevData, [section]: updatedSection };
    });
  };

  const calculateExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); 
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return { years, months };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/resumes/user/${userId}`;
    const request = mode === 'create' ? api.post(url, formData) : api.put(url, formData);
    
    request
      .then(response => {
        toast.success(`Resume ${mode}d successfully:`, response.data);
      })
      .catch(error => {
        toast.error(`Error ${mode}ing the resume:`, error);
      });
  };

  const handleMenuClick = (selectedMode) => {
    setMode(selectedMode);
    setMenuVisible(false); 
  };

  const handleGoBack = () => {
    console.log("userId:", userId);  
    if (userId) {
      navigate(`/JobPortal/jobseeker/${userId}`);
    } else {
      console.error("User ID is missing");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return <p>Loading resume data...</p>;
  }

  return (
    <div>
      <ToastContainer />
      
      <div className="resume-header">
        <button onClick={handleGoBack} className="button-spacing">
          Go Back
        </button>
        <button onClick={handleLogout} className="button-spacing">
          Logout
        </button>
      </div>

      <div className="resume-dropdown">
        <button onClick={() => setMenuVisible(!menuVisible)}>Resume</button>
        {menuVisible && (
          <div className="resume-dropdown-menu">
            {!resumeExists && (
              <button onClick={() => handleMenuClick('create')}>Create Resume</button>
            )}
            <button onClick={() => handleMenuClick('update')}>Update Resume</button>
            <button onClick={() => handleMenuClick('view')}>View Resume</button>
          </div>
        )}
      </div>

      {mode === 'view' ? (
        <ResumeView data={{formData,userName,email,contactNumber,address}} />
      ) : (
        <form onSubmit={handleSubmit} className="resume-form">
          <h2>{mode === 'create' ? 'Create Resume' : 'Update Resume'}</h2>

          <h3>Summary</h3>
          <textarea
            placeholder="Enter summary"
            value={formData.summary.summaryText}
            onChange={(e) => handleInputChange(e, 'summary', null, 'summaryText')}
            disabled={mode === 'view'}
          ></textarea>

          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
                disabled={mode === 'view'}
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, 'education', index, 'institution')}
                disabled={mode === 'view'}
              />
              <input
                type="text"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) => handleInputChange(e, 'education', index, 'startYear')}
                disabled={mode === 'view'}
              />
              <input
                type="text"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) => handleInputChange(e, 'education', index, 'endYear')}
                disabled={mode === 'view'}
              />
            </div>
          ))}
          {mode !== 'view' && (
            <button type="button" className="button-spacing" onClick={() => addSectionItem('education')}>
              Add Education
            </button>
          )}

          <h3>Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.skillName}
                onChange={(e) => handleInputChange(e, 'skills', index, 'skillName')}
                disabled={mode === 'view'}
              />
              <input
                type="text"
                placeholder="Skill Description"
                value={skill.skillDescription}
                onChange={(e) => handleInputChange(e, 'skills', index, 'skillDescription')}
                disabled={mode === 'view'}
              />
            </div>
          ))}
          {mode !== 'view' && (
            <button type="button" className="button-spacing" onClick={() => addSectionItem('skills')}>
              Add Skill
            </button>
          )}

          <h3>Experience</h3>
          {formData.experience.map((exp, index) => {
            const { years, months } = calculateExperience(exp.startDate, exp.endDate);
            return (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Job Position"
                  value={exp.jobPosition}
                  onChange={(e) => handleInputChange(e, 'experience', index, 'jobPosition')}
                  disabled={mode === 'view'}
                />
                <input
                  type="text"
                  placeholder="Office Name"
                  value={exp.officeName}
                  onChange={(e) => handleInputChange(e, 'experience', index, 'officeName')}
                  disabled={mode === 'view'}
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange(e, 'experience', index, 'startDate')}
                  disabled={mode === 'view'}
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange(e, 'experience', index, 'endDate')}
                  disabled={mode === 'view'}
                />
                <p>
                  Duration: {years} years {months} months
                </p>
              </div>
            );
          })}
          {mode !== 'view' && (
            <button type="button" className="button-spacing" onClick={() => addSectionItem('experience')}>
              Add Experience
            </button>
          )}

          <h3>Languages</h3>
          {formData.languages.map((lang, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Language Name"
                value={lang.languageName}
                onChange={(e) => handleInputChange(e, 'languages', index, 'languageName')}
                disabled={mode === 'view'}
              />
              <input
                type="text"
                placeholder="Proficiency"
                value={lang.proficiency}
                onChange={(e) => handleInputChange(e, 'languages', index, 'proficiency')}
                disabled={mode === 'view'}
              />
            </div>
          ))}
          {mode !== 'view' && (
            <button type="button" className="button-spacing" onClick={() => addSectionItem('languages')}>
              Add Language
            </button>
          )}

          {mode !== 'view' && (
            <button type="submit" className='submit-button'>
              {mode === 'create' ? 'Create' : 'Update'} Resume
            </button>
          )}
        </form>
      )}
    </div>
  );
};

const ResumeView = ({ data }) => {
  const { formData, userName, email, contactNumber, address } = data;

  const calculateExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); 
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return { years, months };
  };

  return (
    <div className="resume-view">
      <h2>Resume</h2>

      <div className="contact-info">
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact Number:</strong> {contactNumber}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>

      <h3 className="summary">Summary</h3>
      <p>{formData.summary.summaryText}</p>

      <h3 className="education">Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <p>{edu.degree} from {edu.institution} ({edu.startYear} - {edu.endYear})</p>
        </div>
      ))}

      <h3 className="skills">Skills</h3>
      {formData.skills.map((skill, index) => (
        <div key={index}>
          <p>{skill.skillName}: {skill.skillDescription}</p>
        </div>
      ))}

      <h3 className="experience">Experience</h3>
      {formData.experience.map((exp, index) => {
        const { years, months } = calculateExperience(exp.startDate, exp.endDate);
        return (
          <div key={index}>
            <p>{exp.jobPosition} at {exp.officeName} ({years} years and {months} months)</p>
          </div>
        );
      })}

      <h3 className="languages">Languages</h3>
      {formData.languages.map((lang, index) => (
        <div key={index}>
          <p>{lang.languageName} - {lang.proficiency}</p>
        </div>
      ))}
    </div>
  );
};

export default ResumeForm;
