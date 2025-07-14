// AppWithFetchStatus.jsx
import React from "react";
import App from "./App";
import { useIsFetching } from "@tanstack/react-query";
import SmallSpinner from "./components/SmallSpinner";

const AppWithFetchStatus = () => {
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching ? <SmallSpinner /> : null}
      <App />
    </>
  );
};

export default AppWithFetchStatus;
