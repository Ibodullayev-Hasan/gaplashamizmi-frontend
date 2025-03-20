import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3015"; // API URL-ni o'zgartiring

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Avtomatik ulanmasligi uchun
  transports: ["websocket"], // Faqat WebSocket orqali ulanish
});

export const SocketContext = createContext(socket);
