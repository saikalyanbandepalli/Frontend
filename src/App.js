import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage";
import JobseekerRegistration from "./components/landingpage/JobseekerRegistration";
import EmployerRegistration from "./components/landingpage/EmployerRegistration";
import LoginPage from "./components/landingpage/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Jobseekeregisteration" element={<JobseekerRegistration />} />
        <Route path="/Employerregistration" element={<EmployerRegistration />} />
      </Routes>
    </Router>
  );
};

export default App;
