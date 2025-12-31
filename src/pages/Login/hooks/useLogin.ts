import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginThunk, selectAuthError } from "@/redux/slices/authSlice";
import { ROLE_REDIRECTS } from "../constants";
import type { LoginCredentials } from "../types";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const [loading, setLoading] = useState(false);

  const getRedirectPath = (role: string): string => {
    return ROLE_REDIRECTS[role as keyof typeof ROLE_REDIRECTS] || ROLE_REDIRECTS.default;
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);

    try {
      const result = await dispatch(loginThunk(credentials));
      
      if (loginThunk.fulfilled.match(result)) {
        toast.success("Login successful! Welcome back.");
        const redirectPath = getRedirectPath(result.payload.role);
        navigate(redirectPath);
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    login,
  };
}
