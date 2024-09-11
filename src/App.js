import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/landingpage/LandingPage";
import JobPortalDashBoard from "./components/JobSeeker/JobPortalDashBoard";
import LoginPage from "./components/landingpage/LoginPage";
import JobseekerRegistration from "./components/landingpage/JobseekerRegistration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/JobPortal" element={<JobPortalDashBoard />} />
        <Route path="/Jobseekeregisteration" element={<JobseekerRegistration />} />
      </Routes>
    </Router>
  );
};

export default App;
