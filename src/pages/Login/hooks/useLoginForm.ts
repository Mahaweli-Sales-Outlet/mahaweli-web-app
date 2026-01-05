import { useState } from "react";
import type { LoginFormData } from "../types";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getFormData = (): LoginFormData => ({
    email,
    password,
  });

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    getFormData,
  };
}
