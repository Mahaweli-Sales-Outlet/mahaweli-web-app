import axios, { type AxiosError } from "axios";
import { getStore } from "./setupInterceptors";
import { logoutThunk, refreshTokenThunk } from "@/redux/slices/authSlice";

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

// Add response interceptor for error handling with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && originalRequest) {
      // Prevent infinite retry loops - only retry once per request
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        const store = getStore();
        if (!store) {
          // Store not injected yet, just reject
          return Promise.reject(error);
        }

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            // No refresh token available, logout
            await store.dispatch(logoutThunk());
            return Promise.reject(error);
          }

          // Attempt to refresh the token
          const result = await store.dispatch(refreshTokenThunk());

          if (refreshTokenThunk.fulfilled.match(result)) {
            // Token refreshed successfully, retry original request
            const newToken = result.payload.accessToken;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } else {
            // Token refresh failed, logout
            await store.dispatch(logoutThunk());
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // Error during refresh, logout and reject
          const store = getStore();
          if (store) {
            await store.dispatch(logoutThunk());
          }
          return Promise.reject(refreshError || error);
        }
      } else {
        // Already retried once, logout user
        const store = getStore();
        if (store) {
          const token = localStorage.getItem("accessToken");
          if (token) {
            await store.dispatch(logoutThunk());
          }
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints - Product API moved to @/api/products.ts

export const orderApi = {
  getAll: () => api.get("/orders"),
  getById: (id: number) => api.get(`/orders/${id}`),
  create: (data: any) => api.post("/orders", data),
  updateStatus: (id: number, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// Remove duplicate authApi. Use only the backend API from auth.ts
