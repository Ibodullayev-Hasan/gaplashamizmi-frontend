// components/Loader.jsx
import React from "react";
import "../style/loader.css"; // css-ni alohida yaratamiz

const Loader = () => {
  return (
     <div className="custom-loader">
      <div className="emoji-3d">
        😄
        <div className="hand-come">🖐️</div>
      </div>
      <div className="loader-text">Gaplashamizmi?</div>
    </div>
  );
};

export default Loader;
