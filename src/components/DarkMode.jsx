import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../style/dark-mode.style.css"

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <button onClick={toggle} className="dark-toggle-button">
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
    </button>
  );
};

export default DarkModeToggle;
