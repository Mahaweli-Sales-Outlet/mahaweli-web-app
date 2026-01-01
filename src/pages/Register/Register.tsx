import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Lock, User, Phone } from "lucide-react";
import {
  ErrorAlert,
  FormField,
  PasswordStrengthIndicator,
} from "@/components/auth";
import {
  RegisterHeader,
  ProfileNote,
  LoginLink,
} from "./components";
import {
  useRegisterForm,
  usePasswordStrength,
  useFormValidation,
  useRegisterSubmit,
} from "./hooks";
import { PASSWORD_REQUIREMENTS } from "./constants";

const Register: React.FC = () => {
  const { formData, errors, setErrors, handleInputChange, clearError } =
    useRegisterForm();
  const { passwordStrength, updatePasswordStrength, allRequirementsMet } =
    usePasswordStrength();
  const { validateForm } = useFormValidation();
  const { loading, apiError, handleRegister, clearApiError } =
    useRegisterSubmit();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    clearApiError();

    if (e.target.name === "password") {
      updatePasswordStrength(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await handleRegister(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <RegisterHeader />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && <ErrorAlert message={apiError} />}

            <FormField
              id="name"
              name="name"
              type="text"
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={onInputChange}
              error={errors.name}
              icon={User}
              required
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email Address *"
              placeholder="you@example.com"
              value={formData.email}
              onChange={onInputChange}
              error={errors.email}
              icon={Mail}
              required
            />

            <FormField
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number (Optional)"
              placeholder="0771234567"
              value={formData.phone}
              onChange={onInputChange}
              icon={Phone}
            />

            <div className="space-y-2">
              <FormField
                id="password"
                name="password"
                type="password"
                label="Password *"
                placeholder="••••••••"
                value={formData.password}
                onChange={onInputChange}
                error={errors.password}
                icon={Lock}
                required
              />
              {formData.password && (
                <PasswordStrengthIndicator
                  strength={passwordStrength}
                  requirements={PASSWORD_REQUIREMENTS}
                />
              )}
            </div>

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password *"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={onInputChange}
              error={errors.confirmPassword}
              icon={Lock}
              required
            />

            <ProfileNote />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              disabled={loading || !allRequirementsMet}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <LoginLink />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
