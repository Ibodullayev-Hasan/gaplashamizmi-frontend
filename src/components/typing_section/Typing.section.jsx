import React, { useState } from "react";
import "../../style/general.style.css";
import "./typing.section.css";

const TypingSection = () => {
   const [chats, setChats] = useState([
      { id: 1, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 2, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 3, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 4, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 5, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 6, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
      { id: 7, imageUrl: "/src/assets/pexels-iriser-1366957.jpg", username:"alex" },
  
    ]);

  return (
    <section className="generalStyle typingSection ">
   
          <header className="header-typing-section">
          <div className="header-left-side-chats">

            {/* chats box */}
          <div className="chats-box">
          {chats.map((chat) => (
            <div key={chat.id} className="online">
            <img src={chat.imageUrl} alt={`${chat.id}`} />
          </div>
          ))}
          </div>

          {/* group-title box */}
          <div className="group-title-box">
            Nixtio group <span> +6</span>
          </div>
          </div>

          {/* header right side tools */}
          <div className="header-right-side-tools"></div>
          </header>
        <div className="typing-section-box-scroll-div">
         {chats.map((chat) => (
            <div key={chat.id} className="typingChats">
            <img src={chat.imageUrl} alt={`${chat.id}`} />
          </div>
          ))}
          sada
        </div>
      
    </section>
  );
};

export default TypingSection;
