import { useState } from "react";
import type { RegisterFormData, FormErrors } from "../types";
import { INITIAL_FORM_DATA } from "../constants";

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const clearError = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return {
    formData,
    errors,
    setErrors,
    handleInputChange,
    clearError,
  };
}
