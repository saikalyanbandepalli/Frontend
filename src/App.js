import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage";
import JobseekerRegistration from "./components/landingpage/JobseekerRegistration";
import EmployerRegistration from "./components/landingpage/EmployerRegistration";
import LoginPage from "./components/landingpage/LoginPage";
import ForgotPassword from "./components/landingpage/ForgotPassword";
import ResetPassword from "./components/landingpage/ResetPassword";
import JobPortalDashBoard from "./components/JobSeeker/JobPortalDashBoard"
import ResumeForm from "./components/JobSeeker/ResumeForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/JobPortal" element={<JobPortalDashBoard/>} />
        <Route path="/Jobseekeregisteration" element={<JobseekerRegistration />} />
        <Route path="/Employerregistration" element={<EmployerRegistration />} />
        <Route path="/Forgotpassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ResumeForm" element={<ResumeForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
