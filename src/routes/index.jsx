import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import ChatPage from "../pages/ChatPage";
import NotFound from "../pages/not_found/NotFoundPage";
import { useAuth } from "../context/auth";

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={token ? <Outlet /> : <Navigate to="/login" replace />}
      >
        <Route index element={<ChatPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
