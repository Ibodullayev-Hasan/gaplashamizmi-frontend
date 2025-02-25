import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRefchMutation } from "../services/post.service";
import { getData } from "../services/get.service";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const { mutate: postRefresh } = postRefchMutation("user");

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(JSON.parse(storedToken)); 
    }
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("access_token");
      document.cookie =
        "refToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, [token]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getData("users"),
    enabled: !!token,
  });

  useEffect(() => {
    if (data === 403 || data === 401) {
      setToken(null);
      navigate("/login");
    }

    if (data === 401) {
      postRefresh(
        { url: "auth/refresh" },                           
        {
          onSuccess: (res) => {
            if (res?.accToken) {
              localStorage.setItem(
                "access_token",
                JSON.stringify(res.accToken)
              );
              setToken(res?.accToken);
              refetch();
            } else {
              setToken(null);
              navigate("/login");
            }
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  }, [data]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("access_token");
    document.cookie =
      "refToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, data, isLoading, refetch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
