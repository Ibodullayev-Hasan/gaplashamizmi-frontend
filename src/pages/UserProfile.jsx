import React, { useEffect } from "react";
import { useAuth } from "../context/auth";
import "../style/user-profile.style.css";

const UserProfile = () => {
  const { data } = useAuth();
  const user = data?.data;
  const user_profile = user?.user_profile;

  useEffect(() => {
    if (user_profile) {
      const root = document.documentElement;
      root.style.setProperty("--chat-theme", user_profile.chat_theme);
      root.style.setProperty("--chat-font", user_profile.chat_font);
      root.style.setProperty("--chat-back-img", `url(${user_profile.chat_back_img})`);
    }
  }, [user_profile]);

  return (
    <div className="chat-container">
      <img src={user?.avatar_uri} alt="Avatar" className="avatar" />
      <p>Ismi: {user?.full_name}</p>
    </div>
  );
};

export default UserProfile;
