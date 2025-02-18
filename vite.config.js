import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@fortawesome/fontawesome-free": path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free"),
    },
  },
});
