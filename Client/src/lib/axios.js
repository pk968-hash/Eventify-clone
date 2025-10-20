import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://eventify-backend-alpha.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
