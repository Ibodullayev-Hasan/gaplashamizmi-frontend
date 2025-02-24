import { createContext, useState, useEffect } from "react";
import { fetchWithAuth } from "../api";

export const ChatContext = createContext();

export const  ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Foydalanuvchi yo‘naltirishni oldini olish

  useEffect(() => {
    const fetchChats = async () => {
      let token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const data = await fetchWithAuth("http://localhost:3015/api/v1/users/");
      if (data) {
        setChats(data);
      }
      setLoading(false);
    };

    fetchChats();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};
