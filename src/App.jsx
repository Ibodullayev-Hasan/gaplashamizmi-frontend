import React from "react";
import { AuthProvider } from "./context/auth";
import ReactQueryProvider from "./context/react-query.provider";
import IndexRouter from "./routes";


const App = () => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <IndexRouter />
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default App;
