import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.SOCKET_URL; // API URL-ni o'zgartiring

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Avtomatik ulanmasligi uchun
  transports: ["websocket"], // Faqat WebSocket orqali ulanish
});

export const SocketContext = createContext(socket);
