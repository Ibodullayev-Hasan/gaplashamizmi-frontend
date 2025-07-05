import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Masalan, 2 sekunddan so'ng asosiy App ko‘rinadi
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return <BrowserRouter>{loading ? <Loader /> : <App />}</BrowserRouter>;
};

createRoot(document.getElementById("root")).render(<Root />);
