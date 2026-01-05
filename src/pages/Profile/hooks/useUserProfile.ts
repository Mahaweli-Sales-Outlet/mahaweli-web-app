import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectUser, selectIsAuthenticated } from "@/redux/slices/authSlice";
import { authApi } from "@/api/auth";
import type { User, ProfileFormData } from "../types";

export function useUserProfile() {
  const navigate = useNavigate();
  const reduxUser = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [user, setUser] = useState<User | null>(reduxUser as any);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated || !reduxUser) {
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    // Use Redux user data to populate form immediately
    setUser(reduxUser as any);
    setFormData({
      full_name: reduxUser.name || "",
      email: reduxUser.email || "",
      phone: reduxUser.phone || "",
      address: "", // Address not in Redux, will be fetched if needed
    });
    setLoading(false);

    // Fetch fresh data from API to get address and other details
    authApi
      .getCurrentUser()
      .then((response: any) => {
        const userData = response.data; // Backend returns { success: true, data: user }
        setUser(userData);
        setFormData((prev) => ({
          ...prev,
          full_name: userData.name || prev.full_name,
          email: userData.email || prev.email,
          phone: userData.phone || prev.phone,
          address: userData.address || prev.address,
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch user details:", error);
        // Don't redirect on error, continue with Redux data
      });
  }, [navigate, isAuthenticated, reduxUser]);

  const updateFormData = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const refreshUserData = async () => {
    const response = await authApi.getCurrentUser();
    const updatedUser = response.data.user;
    setUser(updatedUser);
    setFormData({
      full_name: updatedUser.name || "",
      email: updatedUser.email || "",
      phone: updatedUser.phone || "",
      address: updatedUser.address || "",
    });
  };

  return {
    user,
    loading,
    formData,
    updateFormData,
    refreshUserData,
  };
}
