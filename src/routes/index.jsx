import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/auth";
import Login from "../pages/Login";
import Home from "../pages/Home";

const IndexRouter = () => {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/"
          element={token ? <Outlet /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default IndexRouter;
