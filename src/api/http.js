import axios from "axios";

const http = axios.create({
  baseURL: "https://2397-161-22-59-57.ngrok-free.app/api", // ou IP da API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⬅️ ESSENCIAL para cookies HttpOnly
});

export default http;
