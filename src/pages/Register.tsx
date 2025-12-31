import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authApi } from "@/api/auth";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");

    // Update password strength indicator
    if (name === "password") {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[@$!%*?&]/.test(value),
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must meet all requirements";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone || undefined,
      });

      // Store tokens and user info in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("userEmail", response.data.user.email);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userId", response.data.user.id);

      // Redirect to products page
      navigate("/products");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setApiError(
          err.response.data?.error?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setApiError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  const allPasswordRequirementsMet =
    Object.values(passwordStrength).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <p className="text-center text-sm text-gray-600">
            Join Mahaweli Sales Outlet today
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{apiError}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0771234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}

              {formData.password && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md space-y-1">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Password must contain:
                  </p>
                  <div className="flex items-center gap-2">
                    {passwordStrength.hasMinLength ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={`text-xs ${
                        passwordStrength.hasMinLength
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordStrength.hasUppercase ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={`text-xs ${
                        passwordStrength.hasUppercase
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordStrength.hasLowercase ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={`text-xs ${
                        passwordStrength.hasLowercase
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordStrength.hasNumber ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={`text-xs ${
                        passwordStrength.hasNumber
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordStrength.hasSpecialChar ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={`text-xs ${
                        passwordStrength.hasSpecialChar
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      One special character (@$!%*?&)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pl-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  required
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-700">
                💡 You can add your delivery address and other profile details
                later in your account settings.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              disabled={loading || !allPasswordRequirementsMet}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
