import React from "react";

const ProfileDetailsCard = ({ userDetails, handleClose }) => {
  return (
    <div className="profile-details-card">
      <h2>Profile Details</h2>
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
      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
};

export default ProfileDetailsCard;
