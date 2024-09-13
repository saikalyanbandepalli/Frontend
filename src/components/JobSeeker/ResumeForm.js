import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/ResumeForm.css";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    skills: [{ skillName: '', skillDescription: '' }],
    education: [{ degree: '', institution: '', startYear: '', endYear: '' }],
    experience: [{ jobPosition: '', officeName: '', startDate: '', endDate: '' }],
    languages: [{ languageName: '', proficiency: '' }],
    summary: { summaryText: '' },
  });

  const [mode, setMode] = useState('');
  const [userId, setUserId] = useState(2); 
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 


  useEffect(() => {
    if (mode === 'view' || mode === 'update') {
      setLoading(true);
      axios.get(`http://localhost:8080/api/resumes/user/${userId}`)
        .then(response => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching the resume:', error);
          setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/resumes/user/${userId}`;
    const request = mode === 'create' ? axios.post(url, formData) : axios.put(url, formData);
    
    request
      .then(response => {
        console.log(`Resume ${mode}d successfully:`, response.data);
      })
      .catch(error => {
        console.error(`Error ${mode}ing the resume:`, error);
      });
  };

  const handleMenuClick = (selectedMode) => {
    setMode(selectedMode);
    setMenuVisible(false); 
  };

  if (loading) {
    return <p>Loading resume data...</p>;
  }

  return (
    <div>
      <div className="resume-dropdown">
        <button onClick={() => setMenuVisible(!menuVisible)}>Resume</button>
        {menuVisible && (
          <div className="resume-dropdown-menu">
            <button onClick={() => handleMenuClick('create')}>Create Resume</button>
            <button onClick={() => handleMenuClick('update')}>Update Resume</button>
            <button onClick={() => handleMenuClick('view')}>View Resume</button>
          </div>
        )}
      </div>

      {mode === 'view' ? (
        <ResumeView data={formData} />
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
  {formData.experience.map((exp, index) => (
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
    </div>
  ))}
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
        placeholder="Language"
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
    <button type="submit">
      {mode === 'create' ? 'Create Resume' : 'Update Resume'}
    </button>
  )}
</form>
      )}
    </div>
  );
};


const ResumeView = ({ data }) => (
  <div className="resume-view">
    <h2>Resume</h2>
    <h3>Summary</h3>
    <p>{data.summary.summaryText}</p>
    <h3>Education</h3>
    <ul>
      {data.education.map((edu, index) => (
        <li key={index}>
          <strong>{edu.degree}</strong> at {edu.institution} ({edu.startYear} - {edu.endYear})
        </li>
      ))}
    </ul>
    <h3>Skills</h3>
    <ul>
      {data.skills.map((skill, index) => (
        <li key={index}>
          <strong>{skill.skillName}:</strong> {skill.skillDescription}
        </li>
      ))}
    </ul>
    <h3>Experience</h3>
    <ul>
      {data.experience.map((exp, index) => (
        <li key={index}>
          <strong>{exp.jobPosition}</strong> at {exp.officeName} ({exp.startDate} - {exp.endDate})
        </li>
      ))}
    </ul>
    <h3>Languages</h3>
    <ul>
      {data.languages.map((lang, index) => (
        <li key={index}>
          <strong>{lang.languageName}:</strong> {lang.proficiency}
        </li>
      ))}
    </ul>
  </div>
);



export default ResumeForm;
