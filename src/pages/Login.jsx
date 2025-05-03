import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { postDataMutation } from "../services/post.service";
import "../style/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { token, setToken } = useAuth();
  const { mutate: userLogin } = postDataMutation("user");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    userLogin(
      { url: "auth/login", body: formData },
      {
        onSuccess: (res) => {
          if (res?.data.accToken) {
            setToken(res?.data.accToken);
            localStorage.setItem(
              "accToken",
              JSON.stringify(res?.data.accToken)
            );
            localStorage.setItem(
              "refToken",
              JSON.stringify(res?.data.refToken)
            );
          }
        },
        onError: (err) => {
          console.log(err.response?.data?.error);

          setError(
            err.response?.data?.error ||
              err.response?.data?.error?.message?.[0]?.constraints?.isEmail ||
              "Xatolik yuz berdi"
          );
        },
      }
    );
  };

  return (
    <div id="login-container">
      <div id="login-box">
        <h2 id="login-title">Kirish</h2>
        <form onSubmit={handleSubmit} id="login-form">
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
          <button type="submit" id="login-button">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
