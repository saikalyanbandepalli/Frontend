import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage";
import JobseekerRegistration from "./components/landingpage/JobseekerRegistration";
import EmployerRegistration from "./components/landingpage/EmployerRegistration";
import LoginPage from "./components/landingpage/LoginPage";
import ForgotPassword from "./components/landingpage/ForgotPassword";
import ResetPassword from "./components/landingpage/ResetPassword";
import JobPortalDashBoard from "./components/JobSeeker/JobPortalDashBoard";
import ResumeForm from "./components/JobSeeker/ResumeForm";
import EmployerDashboard from "./components/employer/EmployerDashboard";
import JobForm from "./components/employer/JobForm";
import ViewResume from './components/employer/ViewResume';
import MyJobs from "./components/JobSeeker/MyJobs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/JobPortal/jobseeker/:userId"
          element={<JobPortalDashBoard />}
        />
        <Route
          path="/Jobseekeregisteration"
          element={<JobseekerRegistration />}
        />
        <Route path="/JobPortal/myjobs/:userId" element={<MyJobs />} />

        <Route
          path="/Employerregistration"
          element={<EmployerRegistration />}
        />
        <Route path="/Forgotpassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ResumeForm" element={<ResumeForm />} />
        <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
        <Route path="/JobForm" element={<JobForm />} />
        <Route path="/viewResume/:userId" element={<ViewResume />} />
      </Routes>
    </Router>
  );
};

export default App;