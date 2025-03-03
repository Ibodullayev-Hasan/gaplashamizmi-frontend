import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/get.service";
import { useQuery } from "@tanstack/react-query";
import { postRefreshMutation } from "../services/post.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const { mutate: postRefresh } = postRefreshMutation("user");

  useEffect(() => {
    if (!token) {
      refreshAccessToken();
    }
  }, []);

  const refreshAccessToken = () => {
    postRefresh(
      { url: "auth/refresh" },
      {
        onSuccess: (res) => {
          if (res?.accToken) {
            localStorage.setItem("access_token", res.accToken);
            localStorage.setItem("refToken", res.refToken);
            setToken(res.accToken);
          } else {
            logout();
          }
        },
        onError: () => {
          logout();
        },
      }
    );
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refToken");
    }
  }, [token]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getData("users"),
    enabled: !!token,
  });

  useEffect(() => {
    if (data === 403 || data === 401) {
      refreshAccessToken();
    }
  }, [data]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, data, isLoading, refetch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);