// AppWrapper.jsx
import React, { useState, useEffect } from "react";
import CustomLoader from "./components/Loader";
import AppWithFetchStatus from "./AppWithFetchStatus";
import ReactQueryProvider from "./context/react-query.provider"; // ✅ QueryClientProvider o'rami

const AppWrapper = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <CustomLoader />;

  return (
    <ReactQueryProvider>
      <AppWithFetchStatus />
    </ReactQueryProvider>
  );
};

export default AppWrapper;
