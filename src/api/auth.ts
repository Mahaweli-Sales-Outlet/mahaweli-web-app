import { api } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      phone: string | null;
      store_id: string | null;
      is_active: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  updateProfile: async (data: {
    phone?: string;
    address?: string;
    name?: string;
  }) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },
};
