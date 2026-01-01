import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerThunk, selectAuthError, clearError } from "@/redux/slices/authSlice";
import type { RegisterFormData } from "../types";

export function useRegisterSubmit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const apiError = useAppSelector(selectAuthError);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: RegisterFormData) => {
    setLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        registerThunk({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone || undefined,
        })
      );

      if (registerThunk.fulfilled.match(result)) {
        // Redirect to products page
        navigate("/products");
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
    }
  };

  const clearApiError = () => {
    dispatch(clearError());
  };

  return {
    loading,
    apiError,
    handleRegister,
    clearApiError,
  };
}
