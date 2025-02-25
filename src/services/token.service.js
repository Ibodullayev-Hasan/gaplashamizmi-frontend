import axios from "axios";
const BASE_URL = import.meta.env.VITE_API;

// Cookie o‘qish funksiyasi
const getCookie = (name) => {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
};

// Axios instance yaratish
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor – access_token localStorage'dan olinadi
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = JSON.parse(localStorage.getItem("access_token")); // localStorage ishlatilmoqda
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor – access_token yangilash
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Cookie'dan refresh_token olish
        const refreshToken = getCookie("refToken");

        if (!refreshToken) {
          throw new Error("Refresh token mavjud emas!");
        }

        // API ga refresh request yuborish
        const { data } = await axios.post(`${BASE_URL}auth/refresh`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        // Yangi access_token ni saqlash
        localStorage.setItem("access_token", JSON.stringify(data.accToken));

        // Yangi token bilan requestni qayta yuborish
        originalRequest.headers.Authorization = `Bearer ${data.accToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token yangilashda xatolik:", err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
