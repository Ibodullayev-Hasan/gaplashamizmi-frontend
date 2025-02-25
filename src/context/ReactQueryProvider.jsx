"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ReactQueryProvider = ({ childern }) => {
  return (
    <QueryClientProvider client={queryClient}>{childern}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
