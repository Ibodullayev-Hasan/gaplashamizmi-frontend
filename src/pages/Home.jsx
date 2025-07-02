import React, { useState } from "react";
import UserProfile from "./UserProfile";
import Chat from "./Chat";
import Users from "./Users";

const Home = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  return (
    <div className="box">
      <div className="children-box">
        <Users
          onSelectUser={setSelectedChatUser}
          selectedChatUser={selectedChatUser}
        />
        <Chat selectedChatUser={selectedChatUser} />
        <UserProfile />
      </div>
    </div>
  );
};

export default Home;
