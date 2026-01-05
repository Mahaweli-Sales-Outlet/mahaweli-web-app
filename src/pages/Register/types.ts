export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface PasswordStrength {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
