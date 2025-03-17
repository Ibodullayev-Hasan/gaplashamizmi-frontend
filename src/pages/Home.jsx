import React, { useEffect } from "react";
import UserProfile from "./UserProfile";
import Chat from "./Chat";

const Home = () => {
  return (
    <div className="box">
      <div className="children-box">
        <Chat />
        <UserProfile />
      </div>
    </div>
  );
};

export default Home;
