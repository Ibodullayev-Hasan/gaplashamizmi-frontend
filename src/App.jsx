import React from "react";
import Router from "./router/router";
import CombinedProvider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./animation/loading";

const App = () => {
  return (
    <CombinedProvider>
      <ToastContainer />
      <Loading />
      <Router />
    </CombinedProvider>
  );
};

export default App;
