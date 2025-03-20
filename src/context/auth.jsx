import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRefetchMutation } from "../services/post.service";
import { getData } from "../services/get.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("accToken"));
  const { mutate: postRefresh } = postRefetchMutation("user");

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("accToken");
      localStorage.removeItem("refToken");
    }
  }, [token]);

  // API'dan user ma'lumotlarini olish
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getData(`users/profile`),
    enabled: !!token,
  });

  console.log(data);

  // Xatoliklar bo‘lsa, tokenni yangilash yoki foydalanuvchini chiqarish
  useEffect(() => {
    if (data === 403 || data === 404) {
      setToken(null);
      router("/");
    }

    if (data == 401) {
      const refreshToken = JSON.parse(localStorage.getItem("refToken"));

      if (refreshToken) {
        postRefresh(
          {
            url: `auth/refresh`,
          },
          {
            onSuccess: (res) => {
              
              if (res?.status === 403 || res?.status === 401) {
                setToken(null);
                router("/");
              }

              if (res?.data.accToken) {
                localStorage.setItem("accToken", JSON.stringify(res?.data.accToken));
                setToken(res?.data.accToken);
                refetch();
              }
            },
            onError: (error) => {
              throw new Error(error.message);
            },
          }
        );
      }
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ token, setToken, data, isLoading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
