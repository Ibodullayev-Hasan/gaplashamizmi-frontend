import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRefchMutation } from "../services/post.service";
import { getData } from "../services/get.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const [token, setToken] = useState(localStorage.getItem(`access_token`));
  const { mutate: postRefresh } = postRefchMutation(`user`);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(`access_token`);
    }
  }, [token]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getData("users"),
    enabled: !!token,
  });

  useEffect(() => {
    if (data === 403 || data === 404) {
      setToken(null);
      router("/");
    }
    if (data == 401) {
      const refresh = JSON.parse(localStorage.getItem("refresh_token"));
      if (refresh) {
        postRefresh(
          {
            url: "/auth/refresh",
          },
          {
            onSuccess: (res) => {
              if (res?.access_token) {
                localStorage.setItem(
                  "access_token",
                  JSON.stringify(res.access_token)
                );
                setToken(res?.access_token);
                refetch();
              }
              if (res?.status === 403) {
                setToken(null);
                router("/");
              }
            },
            onError: (error) => {
              console.error(error);
            },
          }
        );
      }
    }
  }, [data]);

  //   return...
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        data,
        isLoading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
