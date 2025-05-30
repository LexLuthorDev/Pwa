import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api", // ou IP da API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⬅️ ESSENCIAL para cookies HttpOnly
});

export default http;
