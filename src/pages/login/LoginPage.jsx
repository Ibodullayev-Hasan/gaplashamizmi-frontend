import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.css"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Bu yerda API ga so‘rov yuborib, foydalanuvchini tekshirish kerak
    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "fake-jwt-token"); // Tokenni saqlash (real JWT bo‘lishi kerak)
      navigate("/chat");
    } else {
      alert("Noto‘g‘ri login yoki parol!");
    }
  };

  return (
    <div className="login-container">
      <h2>Kirish</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default LoginPage;
