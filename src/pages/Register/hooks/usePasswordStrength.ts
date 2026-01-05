import { useState } from "react";
import type { PasswordStrength } from "../types";

export function usePasswordStrength() {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const updatePasswordStrength = (password: string) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    });
  };

  const allRequirementsMet = Object.values(passwordStrength).every(Boolean);

  return {
    passwordStrength,
    updatePasswordStrength,
    allRequirementsMet,
  };
}
