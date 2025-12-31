import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authApi } from "@/api/auth";
import axios from "axios";
import LoginHeader from "./LoginHeader";
import LoginError from "./LoginError";
import LoginFields from "./LoginFields";
import RegisterLink from "./RegisterLink";
import DemoCredentials from "./DemoCredentials";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userRole", response.data.user.role);
      localStorage.setItem("userEmail", response.data.user.email);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userId", response.data.user.id);
      if (response.data.user.role === "manager") {
        navigate("/admin/dashboard");
      } else if (response.data.user.role === "customer") {
        navigate("/products");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data?.error?.message || "Invalid email or password"
        );
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <Card className="w-full max-w-md">
        <LoginHeader />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <LoginError error={error} />
            <LoginFields
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <RegisterLink />
            <DemoCredentials />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
