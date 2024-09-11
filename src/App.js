import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/landingpage/LandingPage";
import JobPortalDashBoard from "./components/JobSeeker/JobPortalDashBoard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobportal" element={<JobPortalDashBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
