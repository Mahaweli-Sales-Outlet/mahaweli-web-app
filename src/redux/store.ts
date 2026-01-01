import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer, { type AuthState } from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

// Load auth state from localStorage on app startup
function loadAuthState(): AuthState {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  if (accessToken && userId && userEmail) {
    // Restore user from localStorage
    const user = {
      id: userId,
      email: userEmail,
      name: localStorage.getItem("userName") || "User",
      role: localStorage.getItem("userRole") || "customer",
      phone: null,
      store_id: null,
      is_active: true,
    };

    return {
      user,
      isAuthenticated: true,
      isInitialized: true,
      loading: false,
      error: null,
    };
  }

  // No tokens, mark as initialized and not authenticated
  return {
    user: null,
    isAuthenticated: false,
    isInitialized: true,
    loading: false,
    error: null,
  };
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
  preloadedState: {
    auth: loadAuthState(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
