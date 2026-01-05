import axios, { type AxiosError } from "axios";
import { getStore } from "./setupInterceptors";
import { logoutThunk, refreshTokenThunk } from "@/redux/slices/authSlice";
import { addCsrfTokenToConfig } from "@/utils/csrf";

// Configure your API base URL here
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Enable sending cookies with requests
  withCredentials: true,
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  return addCsrfTokenToConfig(config);
});

// Add response interceptor for error handling with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 errors (Unauthorized - token expired or invalid)
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
          // Attempt to refresh the token
          // Token is in cookie, just call refresh endpoint
          const result = await store.dispatch(refreshTokenThunk());

          if (refreshTokenThunk.fulfilled.match(result)) {
            // Token refreshed successfully, retry original request
            // (cookies are automatically sent with new token)
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
          await store.dispatch(logoutThunk());
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
