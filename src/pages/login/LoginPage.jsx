import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.css";

const API_URL = "http://localhost:3015/api/v1/auth/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/chat");
    }
  }, []); // Login sahifasiga token bilan kelsa, uni yo‘naltiramiz

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.accToken); // accToken emas!
        navigate("/chat");
      } else {
        alert(data.message || "Noto‘g‘ri login yoki parol!");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Server bilan bog‘lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Kirish</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Kirish..." : "Kirish"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
