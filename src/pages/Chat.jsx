import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../style/chat.style.css"; // CSS faylni import qilamiz
const BASE_URL = import.meta.env.VITE_API;

const socket = io(`${BASE_URL}/chat`);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    socket.on("connection", (msg) => {
      console.log("Ulanish: ", msg);
    });

    socket.on("reply", (msg) => {
      console.log("Serverdan kelgan xabar: ", msg);
      setMessages((prev) => [...prev, { text: msg, sender: "server" }]);
    });

    return () => {
      socket.off("connection");
      socket.off("reply");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  // Enter bosilganda xabar jo‘natish
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Har yangi xabar qo‘shilganda avtomatik pastga skroll qilish
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Textarea balandligini matn uzunligiga qarab moslashtirish
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Avval balandlikni qayta tiklash
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px"; // Matnga moslash
    }
  }, [message]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div
              className={
                msg.sender === "user" ? "user-message" : "server-message"
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <textarea
          ref={textAreaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Xabar yozing..."
          className="chat-input"
          rows="2"
        />

        <button onClick={sendMessage} className="chat-button">
          Jo‘natish
        </button>
      </div>
    </div>
  );
};

export default Chat;
