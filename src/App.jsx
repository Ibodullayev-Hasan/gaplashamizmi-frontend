import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./animation/loading";
import AppRouter from "./routes";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { AuthProvider } from "./context/auth";

const App = () => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ToastContainer />
        <Loading />
        <AppRouter />
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default App;
