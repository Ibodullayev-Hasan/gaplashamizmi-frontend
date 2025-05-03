import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import "../style/chat.style.css";
import { useAuth } from "../context/auth";

const Chat = ({ selectedChatUser }) => { 
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null); // 🔹 Chat box uchun ref
  const textAreaRef = useRef(null);
  const { data } = useAuth();
  const currentUser = data?.data; 

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {

      if (currentUser?.id) {
        socket.emit("register", currentUser.id);
      }
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, currentUser]);

  // 🔽 Har safar yangi xabar qo'shilganda chatni eng pastga skroll qilamiz
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!selectedChatUser) {
      return;
    }

    if (!currentUser) {
      return;
    }

    if (message.trim()) {
      const senderId = currentUser.id;
      const receiverId = selectedChatUser?.id || "Noma’lum foydalanuvchi";

      socket.emit("send", { senderId, receiverId, text: message });

      setMessages((prev) => [...prev, { text: message, senderId }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      {selectedChatUser ? (
        <>
          <div className="chat-box" ref={chatBoxRef}> 
            {messages.map((msg, index) => (
              <div key={index} className="message-container">
                <div className={msg.senderId === currentUser?.id ? "user-message" : "server-message"}>
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
              rows="1.5"
            />
            <button onClick={sendMessage} className="chat-button">
              🚀 
            </button>
          </div>
        </>
      ) : (
        <p>❗ Chat boshlash uchun foydalanuvchini tanlang!</p>
      )}
    </div>
  );
};

export default Chat;
