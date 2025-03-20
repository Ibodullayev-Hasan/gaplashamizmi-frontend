import React from "react";
import { AuthProvider } from "./context/auth";
import ReactQueryProvider from "./context/react-query.provider";
import IndexRouter from "./routes";
import { SocketContext, socket } from "./context/SocketContext";

const App = () => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SocketContext.Provider value={socket}>
          <IndexRouter />
        </SocketContext.Provider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default App;
