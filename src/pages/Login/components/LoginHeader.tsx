import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const LoginHeader: React.FC = () => (
  <CardHeader className="space-y-1">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
        <Lock className="w-8 h-8 text-white" />
      </div>
    </div>
    <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
    <p className="text-center text-sm text-gray-600">
      Sign in to your account to continue
    </p>
  </CardHeader>
);

export default LoginHeader;
