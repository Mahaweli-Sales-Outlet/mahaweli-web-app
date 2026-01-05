import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

interface LoginFieldsProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFields: React.FC<LoginFieldsProps> = ({ email, password, onEmailChange, onPasswordChange }) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          id="email"
          type="email"
          placeholder="admin@mahaweli.com"
          value={email}
          onChange={onEmailChange}
          className="pl-10"
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={onPasswordChange}
          className="pl-10"
          required
        />
      </div>
    </div>
  </>
);

export default LoginFields;
