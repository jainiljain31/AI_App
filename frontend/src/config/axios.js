import axios from "axios";

const axiosInstace = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstace;