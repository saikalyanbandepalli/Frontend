import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ResumeForm.css";
import { useNavigate } from "react-router-dom";

const ResumeForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    skills: [{ skillName: "", skillDescription: "" }],
    education: [{ degree: "", institution: "", startYear: "", endYear: "" }],
    experience: [
      { jobPosition: "", officeName: "", startDate: "", endDate: "" },
    ],
    languages: [{ languageName: "", proficiency: "" }],
    summary: { summaryText: "" },
    photo: null,
  });

  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "view" || mode === "update") {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/resumes/user/${userId}`)
        .then((response) => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the resume:", error);
          setError("Failed to load resume data");
          setLoading(false);
        });
    }
  }, [mode, userId]);

  const handleInputChange = (e, section, index, key) => {
    const value = e.target.value;
    setFormData((prevData) => {
      if (section === "summary") {
        return { ...prevData, [section]: { [key]: value } };
      }
      const updatedSection = [...prevData[section]];
      updatedSection[index][key] = value;
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, photo: e.target.files[0] }));
  };

  const addSectionItem = (section) => {
    setFormData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection.push(
        section === "skills"
          ? { skillName: "", skillDescription: "" }
          : section === "education"
          ? { degree: "", institution: "", startYear: "", endYear: "" }
          : section === "experience"
          ? { jobPosition: "", officeName: "", startDate: "", endDate: "" }
          : { languageName: "", proficiency: "" }
      );
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/resumes/user/${userId}`;
    const formDataToSend = new FormData();

    // Append resume data
    Object.keys(formData).forEach((key) => {
      if (key === "photo" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      }
    });

    const request =
      mode === "create"
        ? axios.post(url, formDataToSend)
        : axios.put(url, formDataToSend);

    request
      .then((response) => {
        console.log(`Resume ${mode}d successfully:`, response.data);
        setError("");
      })
      .catch((error) => {
        console.error(`Error ${mode}ing the resume:`, error);
        setError(`Failed to ${mode} resume`);
      });
  };

  const handleMenuClick = (selectedMode) => {
    setMode(selectedMode);
    setMenuVisible(false);
  };
  const handleLogout = () => {
    navigate("/login");
  };

  const goBack = () => {
    navigate(-1);
  };

  const calculateExperience = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    return `${years} years ${months} months`;
  };

  if (loading) {
    return <p>Loading resume data...</p>;
  }

  return (
    <div>
      <div className="resume-dropdown">
        <button onClick={() => setMenuVisible(!menuVisible)}>Resume</button>
        <div className="rightside-btn">
          <button onClick={goBack} className="goback11">
            Go Back
          </button>
          <button onClick={handleLogout} className="goback11">
            Logout
          </button>
        </div>
        {menuVisible && (
          <div className="resume-dropdown-menu">
            <button onClick={() => handleMenuClick("create")}>
              Create Resume
            </button>
            <button onClick={() => handleMenuClick("update")}>
              Update Resume
            </button>
            <button onClick={() => handleMenuClick("view")}>View Resume</button>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {mode === "view" ? (
        <ResumeView data={formData} calculateExperience={calculateExperience} />
      ) : (
        <form onSubmit={handleSubmit} className="resume-form">
          <h2>{mode === "create" ? "Create Resume" : "Update Resume"}</h2>

          <h3>Summary</h3>
          <textarea
            placeholder="Enter summary"
            value={formData.summary.summaryText}
            onChange={(e) =>
              handleInputChange(e, "summary", null, "summaryText")
            }
            disabled={mode === "view"}
          ></textarea>

          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "degree")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "institution")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "startYear")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "endYear")
                }
                disabled={mode === "view"}
                required
              />
            </div>
          ))}
          {mode !== "view" && (
            <button
              type="button"
              className="button-spacing"
              onClick={() => addSectionItem("education")}
            >
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
                onChange={(e) =>
                  handleInputChange(e, "skills", index, "skillName")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="Skill Description"
                value={skill.skillDescription}
                onChange={(e) =>
                  handleInputChange(e, "skills", index, "skillDescription")
                }
                disabled={mode === "view"}
                required
              />
            </div>
          ))}
          {mode !== "view" && (
            <button
              type="button"
              className="button-spacing"
              onClick={() => addSectionItem("skills")}
            >
              Add Skill
            </button>
          )}

          <h3>Experience (In Months)</h3>
          {formData.experience.map((exp, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Job Position"
                value={exp.jobPosition}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "jobPosition")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="Office Name"
                value={exp.officeName}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "officeName")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "startDate")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="date"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "endDate")
                }
                disabled={mode === "view"}
                required
              />
              <p>
                Experience: {calculateExperience(exp.startDate, exp.endDate)}
              </p>
            </div>
          ))}
          {mode !== "view" && (
            <button
              type="button"
              className="button-spacing"
              onClick={() => addSectionItem("experience")}
            >
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
                onChange={(e) =>
                  handleInputChange(e, "languages", index, "languageName")
                }
                disabled={mode === "view"}
                required
              />
              <input
                type="text"
                placeholder="Proficiency"
                value={lang.proficiency}
                onChange={(e) =>
                  handleInputChange(e, "languages", index, "proficiency")
                }
                disabled={mode === "view"}
                required
              />
            </div>
          ))}
          {mode !== "view" && (
            <button
              type="button"
              className="button-spacing"
              onClick={() => addSectionItem("languages")}
            >
              Add Language
            </button>
          )}

          <h3>Upload Photo</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={mode === "view"}
          />
          {formData.photo && mode === "view" && (
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Resume Photo"
              className="resume-photo"
            />
          )}

          <button type="submit" disabled={mode === "view"}>
            {mode === "create" ? "Create Resume" : "Update Resume"}
          </button>
        </form>
      )}
    </div>
  );
};

const ResumeView = ({ data, calculateExperience }) => {
  return (
    <div className="resume-view">
      <h2>Resume View</h2>
      <h3>Summary</h3>
      <p>{data.summary.summaryText}</p>

      <h3>Education</h3>
      {data.education.map((edu, index) => (
        <div key={index}>
          <p>
            {edu.degree} at {edu.institution} ({edu.startYear} - {edu.endYear})
          </p>
        </div>
      ))}

      <h3>Skills</h3>
      {data.skills.map((skill, index) => (
        <div key={index}>
          <p>
            {skill.skillName}: {skill.skillDescription}
          </p>
        </div>
      ))}

      <h3>Experience</h3>
      {data.experience.map((exp, index) => (
        <div key={index}>
          <p>
            {exp.jobPosition} at {exp.officeName} (
            {calculateExperience(exp.startDate, exp.endDate)})
          </p>
        </div>
      ))}

      <h3>Languages</h3>
      {data.languages.map((lang, index) => (
        <div key={index}>
          <p>
            {lang.languageName}: {lang.proficiency}
          </p>
        </div>
      ))}

      {data.photo && (
        <img
          src={URL.createObjectURL(data.photo)}
          alt="Resume Photo"
          className="resume-photo"
        />
      )}
    </div>
  );
};

export default ResumeForm;
