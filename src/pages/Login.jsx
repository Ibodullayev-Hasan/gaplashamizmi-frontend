import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { postDataMutation } from "../services/post.service";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const { token, setToken } = useAuth();
  const { mutate: userLogin } = postDataMutation("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => {
        setGlobalError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [globalError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");

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
          const response = err.response?.data;

          if (Array.isArray(response?.message?.message)) {
            const errorMap = {};
            response.message.message.forEach((msg) => {
              const lower = msg.toLowerCase();
              if (lower.includes("email")) errorMap.email = msg;
              if (lower.includes("parol")) errorMap.password = msg;
              if (lower.includes("6")) errorMap.password = msg;
            });
            setFieldErrors(errorMap);
            return;
          }

          if (typeof response?.message?.message === "string") {
            setGlobalError(response.message.message);
            return;
          }

          setGlobalError("Nomaʼlum xatolik yuz berdi");
        },
      }
    );
  };

  return (
    <div id="login-container">
      {/* flesh message */}
      {globalError && <div className="flash-error-login">{globalError}</div>}
      <div id="login-box">
        {/* login title */}
        <h2 id="login-title">Kirish</h2>

        {/* forma */}
        <form onSubmit={handleSubmit} id="login-form">
          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Emailni kiriting"
              className={fieldErrors.email ? "error-input" : ""}
            />
            {fieldErrors.email && (
              <p className="field-error-login">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="input-group password-group">
            <label>Parol</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Parolni kiriting"
                className={fieldErrors.password ? "error-input" : ""}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                />
              </span>
            </div>
            {fieldErrors.password && (
              <p className="field-error-login">{fieldErrors.password}</p>
            )}
          </div>

          {/* login button */}
          <button type="submit" id="login-button">
            Kirish
          </button>
        </form>
        <p>
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="button-navigate"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
