import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./token.service";

const BASE_URL = import.meta.env.VITE_API;

// POST so‘rov jo‘natish funksiyasi
export const postData = async ({ url, body }) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}${url}`, body);
    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST request uchun React Query mutatsiyasi
export const postDataMutation = (key) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
};

// Refresh token orqali yangi access token olish
export const postRefresh = async ({ url }) => {
  try {
    const accessToken = localStorage.getItem("access_token"); // Token localStorage'dan olinadi

    const res = await axiosInstance.post(
      `${BASE_URL}${url}`,
      {},
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );

    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Refresh request uchun React Query mutatsiyasi
export const postRefreshMutation = (key) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRefresh,
    onSuccess: (res) => {
      if (res?.accToken) {
        localStorage.setItem("access_token", res.accToken); // Yangi tokenni saqlash
      }
      queryClient.invalidateQueries([key]);
    },
  });
};