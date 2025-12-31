import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { ProfileOverviewCard } from "@/components/profile/ProfileOverviewCard";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { QuickLinksSection } from "@/components/profile/QuickLinksSection";

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface FormData {
  full_name: string; // Display name
  email: string;
  phone: string;
  address: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    authApi
      .getCurrentUser()
      .then((response: any) => {
        const userData = response.data.user;
        setUser(userData);
        setFormData({
          full_name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
        setLoading(false);
      })
      .catch(() => {
        navigate(
          "/login?redirect=" + encodeURIComponent(window.location.pathname)
        );
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (formData.full_name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    setSaving(true);
    try {
      await authApi.updateProfile({
        phone: formData.phone,
        address: formData.address,
      });

      toast.success("Profile updated successfully!");

      // Refresh user data
      const response = await authApi.getCurrentUser();
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setFormData({
        full_name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
      });
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      navigate(createPageUrl("Homepage"));
    } catch (error) {
      console.error("Logout error:", error);
      navigate(createPageUrl("Homepage"));
    }
  };

  const handleCancel = () => {
    navigate(createPageUrl("Homepage"));
  };

  const quickLinks = [
    {
      title: "Browse Products",
      description:
        "Explore our full collection of authentic Sri Lankan products",
      onClick: () => navigate(createPageUrl("Products")),
    },
    {
      title: "View Cart",
      description: "Check your shopping cart and proceed to checkout",
      onClick: () => navigate(createPageUrl("Cart")),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          <ProfileOverviewCard user={user} onLogout={handleLogout} />
          <ProfileEditForm
            formData={formData}
            saving={saving}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onCancel={handleCancel}
          />
        </div>

        <QuickLinksSection links={quickLinks} />
      </div>
    </div>
  );
}
