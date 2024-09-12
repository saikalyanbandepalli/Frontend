// data.js

const jobSeekers = [
  {
    jobSeekerId: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    skills: ["Java", "Spring Boot", "React"],
    experience: "3 Years",
    yearOfPassing: 2021,
  },
  {
    jobSeekerId: 2,
    name: "Bob Williams",
    email: "bob.williams@example.com",
    skills: ["Python", "Data Analysis", "SQL"],
    experience: "5 Years",
    yearOfPassing: 2022,
  },
  {
    jobSeekerId: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    experience: "2 Years",
    yearOfPassing: 2024,
  },
  {
    jobSeekerId: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    experience: "7 Years",
    yearOfPassing: 2021,
  },
  {
    jobSeekerId: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    experience: "4 Years",
    yearOfPassing: 2023,
  },
];

const jobs = [
  {
    jobId: 1,
    title: "Java Developer",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "6 - 12 lpa",
    experience: "3 - 5 Years",
    jobLocation: "Bangalore",
    skills: ["Java", "Spring Boot", "React"],
    yearOfPassing: 2020 - 22,
    qualification: "B.Tech/BE",
    shifts: "Night",
    requiredPercentage: 60,
  },
  {
    jobId: 2,
    title: "DBA",
    category: "DBA",
    employmentType: "Full-time",
    salary: "12 - 18 lpa",
    experience: "8 - 10 Years",
    jobLocation: "Hyderabad",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    yearOfPassing: 2015 - 22,
    qualification: "M.Tech",
    shifts: "Day",
    requiredPercentage: 65,
  },
  {
    jobId: 3,
    title: "Senior Java Developer",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "18 - 25 lpa",
    experience: "5 - 8 Years",
    jobLocation: "Chennai",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    yearOfPassing: 2017 - 24,
    qualification: "B.Tech/BE",
    shifts: "Based on Project",
    requiredPercentage: 70,
  },
  {
    jobId: 4,
    title: "React JS Developer",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "5 - 8 lpa",
    experience: "1 - 3 Years",
    jobLocation: "Mumbai",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    yearOfPassing: 2021 - 24,
    qualification: "B.Tech/BE",
    shifts: "Night",
    requiredPercentage: 60,
  },
  {
    jobId: 5,
    title: "Data Analyst",
    category: "Data Science",
    employmentType: "Full-time",
    salary: "10 - 15 lpa",
    experience: "2 - 4 Years",
    jobLocation: "Delhi",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    yearOfPassing: 2019 - 24,
    qualification: "M.Sc.",
    shifts: "Day",
    requiredPercentage: 65,
  },
  {
    jobId: 6,
    title: "Backend Developer",
    category: "Software Developer",
    employmentType: "Full-time",
    salary: "8 - 15 lpa",
    experience: "3 - 5 Years",
    jobLocation: "Bangalore",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    yearOfPassing: 2018 - 24,
    qualification: "B.Tech/BE",
    shifts: "Based on Project",
    requiredPercentage: 60,
  },
  {
    jobId: 7,
    title: "Machine Learning Engineer",
    category: "Artificial Intelligence",
    employmentType: "Full-time",
    salary: "20 - 30 lpa",
    experience: "5 - 8 Years",
    jobLocation: "Pune",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    yearOfPassing: 2016 - 24,
    qualification: "M.Tech",
    shifts: "Day",
    requiredPercentage: 70,
  },
  {
    jobId: 8,
    title: "Frontend Developer",
    category: "Web Development",
    employmentType: "Full-time",
    salary: "6 - 10 lpa",
    experience: "2 - 4 Years",
    jobLocation: "Chennai",
    yearOfPassing: 2020 - 24,
    qualification: "B.Tech/BE",
    shifts: "Day",
    requiredPercentage: 60,
  },
  {
    jobId: 9,
    title: "Cybersecurity Specialist",
    category: "Security",
    employmentType: "Full-time",
    salary: "12 - 20 lpa",
    experience: "4 - 6 Years",
    jobLocation: "Gurgaon",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    yearOfPassing: 2018 - 24,
    qualification: "M.Tech",
    shifts: "Day",
    requiredPercentage: 65,
  },
  {
    jobId: 10,
    title: "Cloud Architect",
    category: "Cloud Computing",
    employmentType: "Full-time",
    salary: "25 - 35 lpa",
    experience: "7 - 10 Years",
    jobLocation: "Noida",
    skills: ["Python", "Data Analysis", "SQL"],
    yearOfPassing: 2015 - 24,
    qualification: "M.Tech",
    shifts: "Night",
    requiredPercentage: 70,
  },
  {
    jobId: 11,
    title: "DevOps Engineer",
    category: "DevOps",
    employmentType: "Full-time",
    salary: "10 - 18 lpa",
    experience: "4 - 6 Years",
    jobLocation: "Bangalore",
    skills: ["Python", "Data Analysis", "SQL"],
    yearOfPassing: 2017 - 24,
    qualification: "M.Tech",
    shifts: "Any Shift",
    requiredPercentage: 65,
  },
  {
    jobId: 12,
    title: "UI/UX Designer",
    category: "Design",
    employmentType: "Full-time",
    salary: "7 - 12 lpa",
    experience: "2 - 5 Years",
    jobLocation: "Pune",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    yearOfPassing: 2019 - 24,
    qualification: "B.Des",
    shifts: "Based on Project",
    requiredPercentage: 60,
  },
  {
    jobId: 13,
    title: "Frontend Developer",
    category: "Web Development",
    employmentType: "Full-time",
    salary: "6 - 10 lpa",
    experience: "2 - 4 Years",
    jobLocation: "Chennai",
    yearOfPassing: 2020 - 24,
    qualification: "B.Tech/BE",
    shifts: "Day",
    requiredPercentage: 60,
  },
  {
    jobId: 14,
    title: "Cybersecurity Specialist",
    category: "Security",
    employmentType: "Full-time",
    salary: "12 - 20 lpa",
    experience: "4 - 6 Years",
    jobLocation: "Gurgaon",
    skills: ["Cybersecurity", "Penetration Testing", "Networking"],
    yearOfPassing: 2018 - 24,
    qualification: "M.Tech",
    shifts: "Day",
    requiredPercentage: 65,
  },
  {
    jobId: 15,
    title: "Cloud Architect",
    category: "Cloud Computing",
    employmentType: "Full-time",
    salary: "25 - 35 lpa",
    experience: "7 - 10 Years",
    jobLocation: "Noida",
    skills: ["Python", "Data Analysis", "SQL"],
    yearOfPassing: 2015 - 24,
    qualification: "M.Tech",
    shifts: "Night",
    requiredPercentage: 70,
  },
  {
    jobId: 16,
    title: "DevOps Engineer",
    category: "DevOps",
    employmentType: "Full-time",
    salary: "10 - 18 lpa",
    experience: "4 - 6 Years",
    jobLocation: "Bangalore",
    skills: ["Python", "Data Analysis", "SQL"],
    yearOfPassing: 2017 - 24,
    qualification: "M.Tech",
    shifts: "Any Shift",
    requiredPercentage: 65,
  },
];

const applications = [
  {
    applicationId: 1,
    jobSeeker: jobSeekers[0], // Alice Johnson
    job: jobs[0], // Java Developer
    appliedDate: "2023-08-01",
    status: "Pending",
  },
  {
    applicationId: 2,
    jobSeeker: jobSeekers[1], // Bob Williams
    job: jobs[4], // Data Analyst
    appliedDate: "2023-08-02",
    status: "Pending",
  },
  {
    applicationId: 3,
    jobSeeker: jobSeekers[2], // Charlie Brown
    job: jobs[3], // React JS Developer
    appliedDate: "2023-08-03",
    status: "Rejected",
  },
  {
    applicationId: 4,
    jobSeeker: jobSeekers[3], // Diana Prince
    job: jobs[9], // Cloud Architect
    appliedDate: "2023-08-05",
    status: "Shortlisted",
  },
  {
    applicationId: 5,
    jobSeeker: jobSeekers[4], // Ethan Hunt
    job: jobs[8], // Cybersecurity Specialist
    appliedDate: "2023-08-06",
    status: "Pending",
  },
  {
    applicationId: 6,
    jobSeeker: jobSeekers[0], // Alice Johnson
    job: jobs[7], // Frontend Developer
    appliedDate: "2023-08-07",
    status: "Interview Scheduled",
  },
  {
    applicationId: 7,
    jobSeeker: jobSeekers[1], // Bob Williams
    job: jobs[5], // Backend Developer
    appliedDate: "2023-08-08",
    status: "Rejected",
  },
  {
    applicationId: 8,
    jobSeeker: jobSeekers[3], // Diana Prince
    job: jobs[10], // DevOps Engineer
    appliedDate: "2023-08-09",
    status: "Pending",
  },
  {
    applicationId: 9,
    jobSeeker: jobSeekers[2], // Charlie Brown
    job: jobs[6], // Machine Learning Engineer
    appliedDate: "2023-08-10",
    status: "Pending",
  },
  {
    applicationId: 10,
    jobSeeker: jobSeekers[4], // Ethan Hunt
    job: jobs[11], // UI/UX Designer
    appliedDate: "2023-08-11",
    status: "Pending",
  },
];

export { jobSeekers, jobs, applications };