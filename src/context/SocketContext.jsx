import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // To'g'ri o'qish

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Avtomatik ulanmasin
  transports: ["websocket"], // Faqat WebSocket ishlasin
});

export const SocketContext = createContext(socket);
