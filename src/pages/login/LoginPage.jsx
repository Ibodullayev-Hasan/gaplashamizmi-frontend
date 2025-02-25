import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.css";
import { useAuth } from "../../context/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { token, setToken } = useAuth;
  const { mutate: userLogin } = postDataMutation("user");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/chat");
    }
  }, []); // Login sahifasiga token bilan kelsa, uni yo‘naltiramiz

  const handleSubmit = async (e) => {
    e.preventDefault();
    userLogin(
      {
        url: "/auth/login",
        body: formData,
      },
      {
        onSuccess: (res) => {
          if (res?.access_token) {
            setToken(res.access_token);
            localStorage.setItem(
              "access_token",
              JSON.stringify(res.access_token)
            );
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(res.refresh_token)
            );
          }
        },
      }
    );
    try {
    } catch (error) {
      console.log(error);
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       localStorage.setItem("access_token", data.accToken); // accToken emas!
  //       navigate("/chat");
  //     } else {
  //       alert(data.message || "Noto‘g‘ri login yoki parol!");
  //     }
  //   } catch (error) {
  //     console.error("Xatolik yuz berdi:", error);
  //     alert("Server bilan bog‘lanishda xatolik!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Kirish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Emailni kiriting"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Parolni kiriting"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
