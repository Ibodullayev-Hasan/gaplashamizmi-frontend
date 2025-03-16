import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./token.service";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API;
// Vite loyihalarida .env fayldagi o‘zgaruvchilar import.meta.env orqali olinadi.
// Agar "VITE_" prefiksi bo‘lmasa, o‘zgaruvchi yuklanmaydi.

/* ---------------------------------------------- */
// API ga POST so‘rovi yuboruvchi umumiy funksiya
export const postData = async ({ url, body }) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}${url}`, body);

    return response?.data;
  } catch (error) {
    return Promise.reject(error); // Xatolikni qaytarish uchun
  }
};

// API ga post so‘rovini yuborish uchun mutatsiya (React Query bilan ishlaydi)
export const postDataMutation = (key) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
};

// Asosan refresh token orqali token yangilashda ishlatiladi
export const postRefresh = async ({ url }) => {
  try {
    const refreshToken = localStorage.getItem("refToken");
    if (!refreshToken) throw new Error("Refresh token topilmadi");

    const res = await axios.post(
      `${BASE_URL}${url}`,
      {},
      {
        headers: { Authorization: `Bearer ${JSON.parse(refreshToken)}` },
      } 
    );
    return res?.data;
  } catch (error) {
    return Promise.reject(error); // Xatolikni qaytarish
  }
};

// Refresh token orqali API ga POST so‘rovini yuboruvchi mutatsiya
export const postRefetchMutation = (key) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRefresh,
    onSuccess: () => {
      queryClient.invalidateQueries([key]); // Eski ma'lumotni yangilash
    },
  });
};
