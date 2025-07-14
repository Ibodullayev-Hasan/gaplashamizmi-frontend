import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import Chat from "./Chat";
import Users from "./Users";
import Tools from "./Tools";

const Home = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTools, setShowTools] = useState(false);

  // Sahifa yuklanganda localStorage'dan chat userni faqat agar reload bo‘lsa olib qo‘yamiz
  useEffect(() => {
    const navType =
      performance.getEntriesByType("navigation")[0]?.type || "navigate";

    const isReload = navType === "reload";

    if (isReload) {
      const storedUser = localStorage.getItem("selectedChatUser");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.id && parsed?.full_name) {
            setSelectedChatUser(parsed);
          }
        } catch (err) {
          console.warn("Yaroqsiz chat user JSON:", err);
          localStorage.removeItem("selectedChatUser");
        }
      }
    } else {
      // reload bo‘lmasa (yangi tab, back, prerender) — localdagi userni tozalaymiz
      localStorage.removeItem("selectedChatUser");
    }
  }, []);

  // selectedChatUser o‘zgarganda localStorage ga yozamiz
  useEffect(() => {
    if (selectedChatUser) {
      const { id, full_name, avatar_uri, email } = selectedChatUser;
      localStorage.setItem(
        "selectedChatUser",
        JSON.stringify({ id, full_name, avatar_uri, email })
      );
    } else {
      localStorage.removeItem("selectedChatUser");
    }
  }, [selectedChatUser]);

  return (
    <div className="box">
      <div className="children-box">
        {/* Users */}
        <Users
          onSelectUser={setSelectedChatUser}
          selectedChatUser={selectedChatUser}
          setShowTools={setShowTools}
        />

        {/* Tools */}
        <Tools setShowTools={setShowTools} showTools={showTools} />

        {/* Chat */}
        <Chat
          selectedChatUser={selectedChatUser}
          showUserProfile={showUserProfile}
          setShowUserProfile={setShowUserProfile}
        />

        {/* User profile */}
        {showUserProfile && (
          <UserProfile
            setShowUserProfile={setShowUserProfile}
            receiverUser={selectedChatUser}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
