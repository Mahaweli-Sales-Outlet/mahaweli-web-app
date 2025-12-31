import axios from "axios";

// Configure your API base URL here
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem("accessToken");
      // Only redirect if user is already authenticated (not during login)
      if (token) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const productApi = {
  getAll: () => api.get("/products"),
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post("/products", data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};

export const orderApi = {
  getAll: () => api.get("/orders"),
  getById: (id: number) => api.get(`/orders/${id}`),
  create: (data: any) => api.post("/orders", data),
  updateStatus: (id: number, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// Remove duplicate authApi. Use only the backend API from auth.ts
