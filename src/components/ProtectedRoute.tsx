import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { 
  selectIsAuthenticated, 
  selectUserRole, 
  selectIsInitialized,
  refreshTokenThunk 
} from "@/redux/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  const isInitialized = useAppSelector(selectIsInitialized);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      // With httpOnly cookies, we can't check token client-side
      // Rely on backend validation via API interceptors
      // Just ensure user is authenticated
      if (!isAuthenticated) {
        setIsValidating(false);
        return;
      }

      // Attempt proactive token refresh on route access
      // This ensures fresh token for protected operations
      try {
        await dispatch(refreshTokenThunk()).unwrap();
        console.log("Token refreshed on route access");
      } catch (error) {
        console.warn("Proactive refresh failed, will retry on API call");
        // Don't logout here - let API interceptor handle it
      }

      setIsValidating(false);
    };

    validateToken();
  }, [dispatch, isAuthenticated]);

  // Wait for auth initialization to complete
  if (!isInitialized || isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userRole !== "manager" && userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
