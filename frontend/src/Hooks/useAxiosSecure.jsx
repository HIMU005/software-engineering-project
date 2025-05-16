import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Set base URL depending on your environment
export const axiosSecure = axios.create({
  baseURL: "https://task-management-himu005.vercel.app", // Change if needed
  // baseURL: "http://localhost:5000", // For local dev
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // Request interceptor: attach token
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle auth errors
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;