import React, { useEffect, useState } from "react";
import "../../style/general.style.css";
import "./users.section.css";
import "@fortawesome/fontawesome-free/css/all.css";

const UsersSection = () => {
  const [chats, setChats] = useState([
    { id: 1, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 2, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 3, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 5, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 6, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
    { id: 7, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },

  ]);

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/chats");
  //       const data = await response.json();
  //       setChats(data);
  //     } catch (error) {
  //       console.error("Xato yuz berdi:", error);
  //     }
  //   };

  //   fetchChats();
  // }, []);

  return (
    <section className="generalStyle usersSection">
      {/*  noread-messages box*/}
      <div className="noread-messages">
        {/* tepa qism yoziv va icon */}
        <div className="message-edit">
          <span>Messages</span>
          <span className="edit">
            <i className="fa-solid fa-pen"></i>
          </span>
        </div>

        {/* pastki qism, chatlar */}
        <div className="messages">
          <div className="scroll-div">
            {chats.map((chat) => (
              <div key={chat.id} className="chat">
                <img src={chat.imageUrl} alt={`${chat.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Box with Icon */}
      <div className="search-box">
        <input type="search" placeholder="Search or start of message" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {/* All Chats */}
<div className="allChatsBox">
  <span>
    <i className="fa-solid fa-comment-dots"></i>
    All chats
  </span>
  <div className="allChats">
    {chats.map((chat) => (
      <div key={chat.id} className="chat-box">
        <img src={chat.imageUrl} alt={`${chat.id}`} />
        <span>{chat.username}</span>
      </div>
    ))}
  </div>
</div>

    </section>
  );
};
export default UsersSection;
