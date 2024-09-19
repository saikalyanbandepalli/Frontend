import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";

const Navbar = ({
  logo,
  handleLogout,
  handleProfileClick,
  navigate,
  userId,
  showAllJobsHandler,
}) => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="Job Portal Logo" className="logo-image" />
      </div>
      <ul className="navbar-menu">
        <li className="menu-item">
          <a href={`/JobPortal/jobseeker/${userId}`} className="menu-link">
            Home
          </a>
        </li>
        <li className="menu-item">
          <a onClick={showAllJobsHandler} className="menu-link">
            All Jobs
          </a>
        </li>
        <li className="menu-item">
          <a
            onClick={() => navigate(`/JobPortal/myjobs/${userId}`)}
            className="menu-link"
          >
            My Jobs
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate(`/ResumeForm`)} className="menu-link">
            Resume
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate(`/ResetPassword`)} className="menu-link">
            Reset Password
          </a>
        </li>
      </ul>
      <div className="profile-actions">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="profile-icon1"
          onClick={handleProfileClick}
        />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
