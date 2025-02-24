let isRefreshing = false; // Token yangilanayotganini tekshirish uchun

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");

  if (!token) {
    console.warn("Token yo'q, login sahifasiga yo'naltiramiz.");
    redirectToLogin();
    return null;
  }

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (response.status === 400 || response.status === 401) {
    if (isRefreshing) {
      console.warn("Token allaqachon yangilanmoqda, kutish kerak.");
      return null;
    }

    isRefreshing = true;
    token = await refreshToken();
    isRefreshing = false;

    if (token) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    } else {
      console.warn("Token yangilanmadi, login sahifasiga yo'naltiramiz.");
      redirectToLogin();
      return null;
    }
  }

  return response.json();
};

// Login sahifasiga faqat BIR MARTA yo‘naltirish
const redirectToLogin = () => {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};
