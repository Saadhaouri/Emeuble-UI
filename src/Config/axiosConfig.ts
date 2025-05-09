// axiosConfig.ts

import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://localhost:7230/api",
  timeout: 10000, // Optional: Set timeout for requests
  headers: {
    "Content-Type": "application/json", // Optional: Set default headers
  },
});

export default axiosApi;