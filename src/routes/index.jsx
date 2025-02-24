import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import ChatPage from "../pages/ChatPage";
import NotFound from "../pages/not_found/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
