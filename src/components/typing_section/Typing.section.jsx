import React, { useState } from "react";
import "../../style/general.style.css";
import "./typing.section.css";
import "@fortawesome/fontawesome-free/css/all.css";

const TypingSection = () => {
  const [chats, setChats] = useState([
    { id: 1, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Alex" },
    { id: 2, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "John" },
    { id: 3, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Emma" },
    { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Sophia" },
    { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Olim aka" },
    { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Jonish" },
    { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username: "Userjon" },
  ]);

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <section className="generalStyle typingSection">
      {/* Header */}
      <header className="header-typing-section">
        <div className="header-left-side-chats">
          <div className="chats-box">
            {chats.map((chat) => (
              <div key={chat.id} className="online">
                <img src={chat.imageUrl} alt={chat.username} />
              </div>
            ))}
          </div>
          <div className="group-title-box">
            <p className="group-title">Ibodullayevs Team</p>
            <p className="online-count">+6 Online...</p>
          </div>
        </div>
        <div className="header-right-side-tools">
          <button className="icon-button star"><i className="fa-solid fa-star"></i></button>
          <button className="icon-button video"><i className="fa-solid fa-video"></i></button>
          <button className="icon-button call"><i className="fa-solid fa-phone"></i></button>
        </div>
      </header>

      {/* Asosiy chat qismi */}
      {selectedChat ? (
        <div className="chat-window">
          <div className="chat-window-header">
            <img className="chat-window-avatar" src={selectedChat.imageUrl} alt={selectedChat.username} />
            <p className="chat-window-username">{selectedChat.username}</p>
            <button className="close-chat-button" onClick={() => setSelectedChat(null)}>✖</button>
          </div>
          <div className="chat-window-body">
            <p>Bu yerda {selectedChat.username} bilan yozishmalar chiqadi...</p>
          </div>
        </div>
      ) : (
        <div className="typing-section-box-scroll-div">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className="chat-message" 
              onClick={() => setSelectedChat(chat)}
            >
              <img className="chat-avatar" src={chat.imageUrl} alt={chat.username} />
              <div className="chat-content">
                <p className="chat-username">{chat.username}</p>
                <p className="chat-text">This is a sample message from {chat.username}.</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TypingSection;
