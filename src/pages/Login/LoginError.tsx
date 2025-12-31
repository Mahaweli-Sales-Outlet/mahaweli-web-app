import React from "react";
import { AlertCircle } from "lucide-react";

interface LoginErrorProps {
  error: string;
}

const LoginError: React.FC<LoginErrorProps> = ({ error }) => (
  error ? (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
      <AlertCircle className="w-5 h-5 text-red-600" />
      <p className="text-sm text-red-600">{error}</p>
    </div>
  ) : null
);

export default LoginError;
