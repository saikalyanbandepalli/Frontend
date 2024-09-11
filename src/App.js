import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/landingpage/LandingPage";
import JobPortal from "./components/jobportallandingpage/JobPortal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobportal" element={<JobPortal />} />
      </Routes>
    </Router>
  );
};

export default App;
