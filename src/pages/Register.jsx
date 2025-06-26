import React, { useEffect, useState } from "react";
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const { setToken } = useAuth();
  const { mutate: userRegister } = postDataMutation("user");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(globalError);
    
    if (globalError) {
      const timer = setTimeout(() => {
        setGlobalError("");
      }, 4000); // 4 sekunddan keyin yo‘qoladi

      return () => clearTimeout(timer);
    }
  }, [globalError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");

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

        // Error
        onError: (err) => {
          const response = err.response?.data;

          if (Array.isArray(response?.message?.message)) {
            const errorMap = {};
            response.message.message.forEach((msg) => {
              const lower = msg.toLowerCase();
              if (lower.includes("full_name")) errorMap.full_name = msg;
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
    <div id="register-container">
      {/* flesh message */}
      {globalError && <div className="flash-error-register">{globalError}</div>}
      <div id="register-box">
        <h2>Ro'yxatdan o'tish</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label>To'liq ismingiz</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ismingizni kiriting"
              className={fieldErrors.full_name ? "error-input" : ""}
            />
            {fieldErrors.full_name && (
              <p className="field-error-register">{fieldErrors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Emailni kiriting"
              className={fieldErrors.email ? "error-input" : ""}
            />
            {fieldErrors.email && (
              <p className="field-error-register">{fieldErrors.email}</p>
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
              <p className="field-error">{fieldErrors.password}</p>
            )}
          </div>

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
