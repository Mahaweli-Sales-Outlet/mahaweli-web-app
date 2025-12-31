import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/auth";
import type { LoginRequest, RegisterRequest } from "@/api/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  store_id: string | null;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null,
};

// Async Thunks
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      if (response?.data?.user) {
        const { user, accessToken, refreshToken } = response.data;
        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        return user;
      }
      return rejectWithValue("Login failed: Invalid response");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Login failed"
      );
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      if (response?.data?.user) {
        const { user, accessToken, refreshToken } = response.data;
        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        return user;
      }
      return rejectWithValue("Registration failed: Invalid response");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Registration failed"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      // Call logout API (optional, backend treats it as no-op)
      await authApi.logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API fails
    }

    // Clear all auth tokens and data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    return null;
  }
);

interface UpdateProfileRequest {
  phone?: string;
  address?: string;
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  currentPin?: string;
  newPin?: string;
}

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.updateProfile(payload);
      if (response?.user) {
        const user = response.user;
        // Update localStorage with new user data
        localStorage.setItem("userName", user.name);
        if (user.phone) {
          localStorage.setItem("userPhone", user.phone);
        }
        return user;
      }
      return rejectWithValue("Profile update failed: Invalid response");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Profile update failed"
      );
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return rejectWithValue("No refresh token available");
      }

      const response = await authApi.refreshToken(refreshToken);
      if (response?.accessToken) {
        const { accessToken } = response;
        localStorage.setItem("accessToken", accessToken);
        return { accessToken };
      }
      return rejectWithValue("Token refresh failed: Invalid response");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Token refresh failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login Thunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register Thunk
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Logout Thunk
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Update Profile Thunk
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Refresh Token Thunk
    builder
      .addCase(refreshTokenThunk.pending, () => {
        // Don't set loading for silent refresh
      })
      .addCase(refreshTokenThunk.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setCredentials,
  clearCredentials,
  clearError,
  setInitialized,
  updateUser,
} = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUserRole = (state: { auth: AuthState }) =>
  state.auth.user?.role;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsInitialized = (state: { auth: AuthState }) =>
  state.auth.isInitialized;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;

export default authSlice.reducer;
