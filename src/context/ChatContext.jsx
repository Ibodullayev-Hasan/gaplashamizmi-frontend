import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/chats")
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.error("Xato yuz berdi:", error));
  }, []);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};
