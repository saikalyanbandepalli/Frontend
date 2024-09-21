import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faUserCircle, faEdit } from "@fortawesome/free-solid-svg-icons"; // Import the icons
import api from "../../config/api";

const ProfileDetailsCard = ({ userDetails, handleClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(userDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/update/${userDetails.userId}`,
        updatedDetails
      );
      console.log("Profile updated successfully:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div id="profile-details-card" className="profile-details-card">
      <h2>Profile Details</h2>
      {isEditing ? (
        <>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={updatedDetails.userName}
            onChange={handleChange}
          />
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={updatedDetails.firstName}
            onChange={handleChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={updatedDetails.lastName}
            onChange={handleChange}
          />
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={updatedDetails.contactNumber}
            onChange={handleChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={updatedDetails.address}
            onChange={handleChange}
          />

          {/* Save and Close buttons on the same line */}
          <div className="button-container">
            <button onClick={handleSave} className="save-button">
              Save
            </button>
            <button onClick={handleClose} className="close-button2">
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>Username:</strong> {userDetails.userName}
          </p>
          <p>
            <strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileDetailsCard;
