import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerThunk, selectAuthError } from "@/redux/slices/authSlice";
import type { RegisterFormData } from "../types";

export function useRegisterSubmit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const apiError = useAppSelector(selectAuthError);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: RegisterFormData) => {
    setLoading(true);

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
    // Note: Error clearing is handled by Redux on route changes
    // This function is kept for input change handling in the component
  };

  return {
    loading,
    apiError,
    handleRegister,
    clearApiError,
  };
}
