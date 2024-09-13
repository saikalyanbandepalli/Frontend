import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    skills: [
      {
        skillName: '',
        skillDescription: '',
      },
    ],
    education: [
      {
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
      },
    ],
    experience: [
      {
        jobPosition: '',
        officeName: '',
        startDate: '',
        endDate: '',
      },
    ],
    languages: [
      {
        languageName: '',
        proficiency: '',
      },
    ],
    summary: {
      summaryText: '',
    },
  });

  const userId = 2; // Replace with the logged-in user ID

  // Handle form input change
  const handleInputChange = (e, section, index, key) => {
    const value = e.target.value;
    setFormData((prevData) => {
      if (section === 'summary') {
        return { ...prevData, [section]: { [key]: value } };
      }
      const updatedSection = [...prevData[section]];
      updatedSection[index][key] = value;
      return { ...prevData, [section]: updatedSection };
    });
  };

  // Add new section item (like skill, education, etc.)
  const addSectionItem = (section) => {
    setFormData((prevData) => {
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

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/resumes/user/${userId}`, formData)
      .then((response) => {
        console.log('Resume submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting the resume:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <h2>Create Resume</h2>

      {/* Skills Section */}
      <h3>Skills</h3>
      {formData.skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Skill Name"
            value={skill.skillName}
            onChange={(e) => handleInputChange(e, 'skills', index, 'skillName')}
          />
          <input
            type="text"
            placeholder="Skill Description"
            value={skill.skillDescription}
            onChange={(e) =>
              handleInputChange(e, 'skills', index, 'skillDescription')
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('skills')}>
        Add Skill
      </button>

      {/* Education Section */}
      <h3>Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) =>
              handleInputChange(e, 'education', index, 'institution')
            }
          />
          <input
            type="text"
            placeholder="Start Year"
            value={edu.startYear}
            onChange={(e) =>
              handleInputChange(e, 'education', index, 'startYear')
            }
          />
          <input
            type="text"
            placeholder="End Year"
            value={edu.endYear}
            onChange={(e) =>
              handleInputChange(e, 'education', index, 'endYear')
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('education')}>
        Add Education
      </button>

      {/* Experience Section */}
      <h3>Experience</h3>
      {formData.experience.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Job Position"
            value={exp.jobPosition}
            onChange={(e) =>
              handleInputChange(e, 'experience', index, 'jobPosition')
            }
          />
          <input
            type="text"
            placeholder="Office Name"
            value={exp.officeName}
            onChange={(e) =>
              handleInputChange(e, 'experience', index, 'officeName')
            }
          />
          <input
            type="date"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) =>
              handleInputChange(e, 'experience', index, 'startDate')
            }
          />
          <input
            type="date"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) =>
              handleInputChange(e, 'experience', index, 'endDate')
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('experience')}>
        Add Experience
      </button>

      {/* Language Section */}
      <h3>Languages</h3>
      {formData.languages.map((lang, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Language Name"
            value={lang.languageName}
            onChange={(e) =>
              handleInputChange(e, 'languages', index, 'languageName')
            }
          />
          <input
            type="text"
            placeholder="Proficiency"
            value={lang.proficiency}
            onChange={(e) =>
              handleInputChange(e, 'languages', index, 'proficiency')
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addSectionItem('languages')}>
        Add Language
      </button>

      {/* Summary Section */}
      <h3>Summary</h3>
      <textarea
        placeholder="Enter summary"
        value={formData.summary.summaryText}
        onChange={(e) =>
          handleInputChange(e, 'summary', null, 'summaryText')
        }
      ></textarea>

      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeForm;
