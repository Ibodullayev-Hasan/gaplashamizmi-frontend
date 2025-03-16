import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { postDataMutation } from "../services/post.service";
import "../style/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { token, setToken } = useAuth();
  const { mutate: userLogin } = postDataMutation("user");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    userLogin(
      { url: "auth/login", body: formData },
      {
        onSuccess: (res) => {
          if (res?.data.accToken) {
                       
            setToken(res?.data.accToken);
            localStorage.setItem("accToken", JSON.stringify(res?.data.accToken));
            localStorage.setItem("refToken", JSON.stringify(res?.data.refToken));
          }
        },
      }
    );

    try {
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
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
            />
          </div>
          <div className="input-group">
            <label>Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parolni kiriting"
              required
            />
          </div>
          <button type="submit" id="login-button">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
