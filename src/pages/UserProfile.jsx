import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faBars,
  faCircleInfo,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../style/user-profile.style.css";

const UserProfile = ({ setShowUserProfile, receiverUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <div className={`user-profile-container ${isOpen ? "open" : ""}`}>
        {/* Arrow button */}
        <button
          className="hide-profile-btn"
          onClick={() => setShowUserProfile(false)}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>

        {/* receiver user profile */}
        <div className="user-profile">
          <img
            src={receiverUser?.avatar_uri || "/default-avatar.png"}
            alt="user avatar"
            className="avatar"
          />
          <p className="user-name">{receiverUser?.full_name || "No User"}</p>
        </div>

        <div className="user-info-container">
          <ul>
            <li className="user-info-full-name">
              <FontAwesomeIcon icon={faUser} className="icon-user" />
              <span>{receiverUser?.full_name}</span>
            </li>
            <li className="user-info-email">
              <FontAwesomeIcon icon={faEnvelope} className="icon-email" />
              <span>{receiverUser?.email}</span>
            </li>
            <li className="user-info-bio">
              <FontAwesomeIcon icon={faCircleInfo} className="icon-info" />
              <span>{receiverUser?.bio || "No bio available"}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
