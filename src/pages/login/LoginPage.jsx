import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.css";
import { useAuth } from "../../context/auth";
import { postDataMutation } from "../../services/post.service";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setToken } = useAuth(); // useAuth ni to‘g‘ri chaqiramiz
  const { mutate: userLogin } = postDataMutation("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/chat");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(
      {
        url: "auth/login",
        body: formData,
      },
      {
        onSuccess: (res) => {
          if (res?.accToken) { // "accToken" ni to'g'ri ishlatamiz
            setToken(res.accToken);
            localStorage.setItem("access_token", JSON.stringify(res.accToken)); // "accToken" saqlanadi
            document.cookie = `refToken=${res.refToken}; path=/;`;
            navigate("/chat");
          }
        },
        onError: (error) => {
          console.error("Login xatoligi:", error);
        },
      }
    );
  };
  

  return (
    <div className="login-container">
      <h2>Kirish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Emailni kiriting"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Parolni kiriting"
          required
        />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default LoginPage;
