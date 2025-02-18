import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChatProvider } from "./context/ChatContext";
import AppRouter from "./routes";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <AppRouter />
    </ChatProvider>
  </StrictMode>
);
