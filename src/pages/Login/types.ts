export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginCredentials extends LoginFormData {}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
