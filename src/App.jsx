import React from "react";
import CombinedProvider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./animation/loading";
import AppRouter from "./routes"; 

const App = () => {
  return (
    <CombinedProvider>
      <ToastContainer />
      <Loading />
      <AppRouter />
    </CombinedProvider>
  );
};

export default App;
