import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../style/user-profile.style.css";

const UserProfile = () => {
  const { data } = useAuth();
  const user = data?.data;
  const user_profile = user?.user_profile;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user_profile) {
      const root = document.documentElement;
      root.style.setProperty("--chat-theme", user_profile.chat_theme);
      root.style.setProperty("--chat-font", user_profile.chat_font);
      root.style.setProperty(
        "--chat-back-img",
        `url(${user_profile.chat_back_img})`
      );
    }
  }, [user_profile]);

  return (
    <>
      {/* Hamburger menyu tugmasi */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Profil menyusi */}
      <div className={`user-profile-container ${isOpen ? "open" : ""}`}>
        <div className="user-profile">
          <img src={user?.avatar_uri} alt="Avatar" className="avatar" />
          <p>Ismi: {user?.full_name}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
