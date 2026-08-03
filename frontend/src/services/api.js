import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

// Export API instance
export default api;