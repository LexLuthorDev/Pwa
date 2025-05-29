import axios from "axios";

const http = axios.create({
  baseURL: "https://ff7f-161-22-58-217.ngrok-free.app/api", // ou IP da API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⬅️ ESSENCIAL para cookies HttpOnly
});

export default http;
