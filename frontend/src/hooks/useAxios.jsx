import axios from "axios";
import { useEffect } from "react";
import { api } from "./../api";
import useAuth from "./useAuth";

export default function useAxios() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = auth?.refreshToken;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );
          const { token } = response.data;

          console.log(`New Token: ${token}`);
          setAuth({ ...auth, authToken: token });

          originalRequest.headers.Authorization = `Bearer ${token}`;

          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }, [auth.authToken]);

  return { api };
}
