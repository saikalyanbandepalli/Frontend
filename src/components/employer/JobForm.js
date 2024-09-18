import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import '../Styles/JobForm.css';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const JobForm = () => {
  const employerId = useSelector((state) => state.employer.employerId); // Get employerId from Redux store

  const [categories, setCategories] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState(''); 
  const [jobDescription, setJobDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [location, setLocation] = useState('');
  const [postDate, setPostDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    api.get('/categories/all')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Fetch employer details by employerId
  useEffect(() => {
    if (employerId) {
      api.get(`/employers/${employerId}`)
        .then(response => {
          const employer = response.data;
          setCompanyName(employer.companyName); // Set the companyName based on the API response
        })
        .catch(error => console.error('Error fetching employer details:', error));
    }
  }, [employerId]);

  const jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT'];
  const salaryRanges = [
    { value: 'ONE_TO_THREE_LPA', label: '1-3 LPA' },
    { value: 'THREE_TO_FIVE_LPA', label: '3-5 LPA' },
    { value: 'FIVE_TO_SEVEN_LPA', label: '5-7 LPA' },
    { value: 'SEVEN_TO_TEN_LPA', label: '7-10 LPA' },
    { value: 'TWENTY_FIVE_PLUS_LPA', label: '25+ LPA' }
  ];
  const experienceLevels = [
    { value: 'FRESHER', label: 'Fresher' },
    { value: 'THREE_TO_FIVE_YEARS', label: '3-5 years' },
    { value: 'FIVE_TO_SEVEN_YEARS', label: '5-7 years' },
    { value: 'TEN_PLUS_YEARS', label: '10+ years' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const job = {
      jobTitle,
      companyName,
      jobDescription,
      skillsRequired,
      category: { categoryId },
      jobType,
      salaryRange,
      experienceRequired,
      location,
      employer: { empolyerId: employerId },  
      postDate,
      endDate
    };

    api.post('/jobs/create', job)
      .then(response => {
        console.log('Job created successfully:', response.data);
        toast.success('Job created successfully!');

        // Reset form fields after submission
        setJobTitle('');
        setJobDescription('');
        setSkillsRequired('');
        setCategoryId('');
        setJobType('');
        setSalaryRange('');
        setExperienceRequired('');
        setLocation('');
        setPostDate('');
        setEndDate('');
      })
      .catch(error => {
        console.error('Error creating job:', error);
        toast.error('Error creating job. Please try again.');
      });
  };

  return (
    <div className="job-form-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName} // Auto-filled with employer's company name
            readOnly // Disable manual input for company name
          />
        </div>
        <div>
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="skillsRequired">Skills Required:</label>
          <input
            type="text"
            id="skillsRequired"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="jobType">Job Type:</label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="">Select Job Type</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="salaryRange">Salary Range:</label>
          <select
            id="salaryRange"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            required
          >
            <option value="">Select Salary Range</option>
            {salaryRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="experienceRequired">Experience Required:</label>
          <select
            id="experienceRequired"
            value={experienceRequired}
            onChange={(e) => setExperienceRequired(e.target.value)}
            required
          >
            <option value="">Select Experience Level</option>
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postDate">Post Date:</label>
          <input
            type="date"
            id="postDate"
            value={postDate}
            onChange={(e) => setPostDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Job</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default JobForm;
