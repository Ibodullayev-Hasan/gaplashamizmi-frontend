import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // <-- Qo‘shildi
import "../style/user-profile.style.css";

const UserProfile = () => {
  const { data, setToken } = useAuth();
  const navigate = useNavigate(); // <-- Qo‘shildi
  const user = data?.data;
  const user_profile = user?.user_profile;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accToken");
    localStorage.removeItem("refToken");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    if (user_profile?.chat_back_img) {
      const root = document.documentElement;
      root.style.setProperty("--chat-theme", user_profile.chat_theme || "#fff");
      root.style.setProperty(
        "--chat-font",
        user_profile.chat_font || "Arial, sans-serif"
      );
      root.style.setProperty(
        "--chat-back-img",
        `url("${user_profile.chat_back_img}")`
      );
    }
  }, [user_profile]);

  return (
    <>
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className={`user-profile-container ${isOpen ? "open" : ""}`}>
        <div className="user-profile">
          <img src={user?.avatar_uri} alt="user avatar" className="avatar" />
          <p>
            Hi 👋
            <span className="user-name">{user ? user.full_name : "Guest"}</span>
          </p>

          {/* Log out tugmasi */}
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
