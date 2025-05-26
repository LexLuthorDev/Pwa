import axios from "axios";

const http = axios.create({
  baseURL: "https://762a-45-160-89-106.ngrok-free.app/api", // ou IP da API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⬅️ ESSENCIAL para cookies HttpOnly
});

export default http;
