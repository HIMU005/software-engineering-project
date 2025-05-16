import axios from "axios";

// Create an Axios instance for public requests (no token required)
const axiosCommon = axios.create({
  baseURL: "https://task-management-himu005.vercel.app",
  // baseURL: 'http://localhost:5000', // Uncomment for local development
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;