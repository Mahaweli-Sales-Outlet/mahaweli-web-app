import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorAlert } from "@/components/auth";
import {
  LoginHeader,
  LoginFields,
  RegisterLink,
} from "./components";
import { useLoginForm, useLogin } from "./hooks";

export default function Login() {
  const { email, password, handleEmailChange, handlePasswordChange, getFormData } = useLoginForm();
  const { error, loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(getFormData());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <Card className="w-full max-w-md">
        <LoginHeader />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorAlert message={error} />}
            <LoginFields
              email={email}
              password={password}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <RegisterLink />
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
