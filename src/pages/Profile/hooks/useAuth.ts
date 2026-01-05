import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { authApi } from "@/api/auth";

export function useAuth() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      navigate(createPageUrl("Homepage"));
    }
  };

  return {
    logout,
  };
}
