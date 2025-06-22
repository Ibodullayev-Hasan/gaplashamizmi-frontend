import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { postDataMutation } from "../services/post.service";
import "../style/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const { mutate: userRegister } = postDataMutation("user");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    userRegister(
      { url: "auth/sign-up", body: formData },
      {
        onSuccess: (res) => {
          if (res?.data.accToken) {
            setToken(res.data.accToken);
            localStorage.setItem("accToken", JSON.stringify(res.data.accToken));
            localStorage.setItem("refToken", JSON.stringify(res.data.refToken));
            navigate("/");
          }
        },
        onError: (err) => {
          console.log(err.response?.data?.error);
          setError(
            err.response?.data?.error?.message?.[0]?.constraints?.[
              Object.keys(
                err.response?.data?.error?.message?.[0]?.constraints || {}
              )[0]
            ] ||
              err.response?.data?.error ||
              "Xatolik yuz berdi"
          );
        },
      }
    );
  };

  return (
    <div id="register-container">
      <div id="register-box">
        <h2>Ro'yxatdan o'tish</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>To'liq ismingiz</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ismingizni kiriting"
              required
              className={error ? "error-input" : ""}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Emailni kiriting"
              required
              className={error ? "error-input" : ""}
            />
          </div>
          <div className="input-group password-group">
            <label>Parol</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Parolni kiriting"
                required
                className={error ? "error-input" : ""}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" id="register-button">
            Register
          </button>
        </form>
        <p>
          Do you already have an account?
          <button
            onClick={() => navigate("/login")}
            className="button-navigate"
          >
            Kirish
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
