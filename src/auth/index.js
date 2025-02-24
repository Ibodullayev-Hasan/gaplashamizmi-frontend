export const refreshToken = async () => {
  try {
    console.log("Token yangilanmoqda...");
    const response = await fetch("http://localhost:3015/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Tokenni yangilash muvaffaqiyatsiz bo‘ldi");
      return null;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.accToken); 
    console.log("Token yangilandi:", data.accToken);
    return data.accToken;
  } catch (error) {
    console.error("refreshToken xatosi:", error);
    return null;
  }
};
