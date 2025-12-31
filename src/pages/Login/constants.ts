export const DEMO_CREDENTIALS = {
  email: "customer@example.com",
  password: "admin123",
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  GENERIC_ERROR: "An error occurred. Please try again.",
};

export const ROLE_REDIRECTS = {
  manager: "/admin/dashboard",
  customer: "/products",
  default: "/",
} as const;
