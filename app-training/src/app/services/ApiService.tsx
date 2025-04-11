import axios from "axios";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

export default apiService;
