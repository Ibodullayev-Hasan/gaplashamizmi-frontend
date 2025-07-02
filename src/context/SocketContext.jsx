import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const rawToken = localStorage.getItem("refToken");

const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

export const createSocket = () =>
  io(`${SOCKET_URL}/chat`, {
    autoConnect: false,
    transports: ["websocket"],
    query: {
      token,
    },
  });

export const socket = createSocket(); // default socket
export const SocketContext = createContext(socket);
