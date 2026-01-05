import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer, { type AuthState } from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

// Load auth state from Redux (not localStorage)
// With httpOnly cookies, tokens are automatically sent with API requests
// No need to load from localStorage
function loadAuthState(): AuthState {
  // Start as unauthenticated
  // Auth state will be restored when user API is called (e.g., GET /api/auth/me)
  // or after successful login
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
