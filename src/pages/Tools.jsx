import { useAuth } from "../context/auth";
import "../style/tools.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBoxArchive,
  faGear,
  faPen,
  faUser,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { postData } from "../services/post.service";
import DarkModeToggle from "../components/DarkMode";

const Tools = ({ showTools, setShowTools }) => {
  const { data, setToken, refetch } = useAuth();
  const navigate = useNavigate(); // redirect uchun
  const imgRef = useRef(null);
  const [textColor, setTextColor] = useState("black");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Flash errorni avtomatik yo‘qotish
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  //
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const fac = new FastAverageColor();

    if (img.complete) {
      extractColor(img, fac);
    } else {
      img.onload = () => extractColor(img, fac);
    }
  }, []);

  const extractColor = (img, fac) => {
    try {
      const colorData = fac.getColor(img);
      setTextColor(colorData.isDark ? "white" : "black");
    } catch (err) {
      console.warn("Rang aniqlanmadi:", err);
    }
  };

  //   img uploader func
  const imgUploader = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      // 1. Rasmni yuklash (POST)
      const res = await postData({
        url: "users/avatar",
        body: formData,
        isFormData: true,
      });

      const imgUrl = res?.imageUrl;

      if (imgUrl) {
        // 2. Profilni yangilash (PATCH)
        await postData({
          url: "users/user-profile",
          method: "PATCH",
          body: {
            avatar_uri: imgUrl,
          },
        });

        await refetch();

        // 4. Rasmni qaytadan o‘qish uchun rang kontrastni yangilash
        const fac = new FastAverageColor();
        if (imgRef.current?.complete) {
          extractColor(imgRef.current, fac);
        }
      }
    } catch (error) {
      setErrorMsg(`${error?.response?.data?.message?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // 1. Tokenlarni o‘chirish
    localStorage.removeItem("accToken");
    localStorage.removeItem("refToken");

    setToken(null);

    navigate("/login");
  };

  if (!showTools) return null;

  return (
    <div className="tools-overlay">
      <div className="tools-backdrop" onClick={() => setShowTools(false)}></div>

      {errorMsg && <div className="tools-flash-error">{errorMsg}</div>}

      <div id="tools">
        <div
          className="close-arrow"
          onClick={() => setShowTools(false)}
          style={{ color: textColor }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="avatar-section">
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={data?.data?.avatar_uri}
            alt={data?.data?.full_name || "Avatar"}
            className={
              data?.data?.avatar_uri ===
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s"
                ? "default-avatar-img"
                : "user-avatar-img"
            }
          />
          <p style={{ color: textColor }}>{data?.data?.full_name || "Guys"}</p>
          <label
            htmlFor="img-upload"
            className="img-upload-pen"
            style={{ color: textColor }}
          >
            <FontAwesomeIcon icon={faPen} />
          </label>
          <input type="file" id="img-upload" onChange={imgUploader} />

          {/* 👇 loader block */}
          {loading && (
            <div className="img-loading-overlay">
              <div className="small-spinner center-spinner" />
            </div>
          )}
        </div>

        {/* tools menu */}
        <ul className="tools-menu">
          <li className="tools-menu-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Account</span>
          </li>
          <li className="tools-menu-item">
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </li>
          <li className="tools-menu-item">
            <DarkModeToggle />
            <span>Night mode</span>
          </li>
          <li className="tools-menu-item">
            <FontAwesomeIcon icon={faBoxArchive} />
            <span>Saved messages</span>
          </li>
        </ul>

        {/* log out */}
        <button className="log-out" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Tools;
