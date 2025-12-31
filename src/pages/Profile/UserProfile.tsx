import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ProfileOverviewCard } from "@/components/profile/ProfileOverviewCard";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { QuickLinksSection } from "@/components/profile/QuickLinksSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BackButton from "@/components/ui/BackButton";
import { useUserProfile, useProfileForm, useAuth, useQuickLinks } from "./hooks";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, loading, formData, updateFormData, refreshUserData } = useUserProfile();
  const { saving, handleSubmit } = useProfileForm(formData, refreshUserData);
  const { logout } = useAuth();
  const quickLinks = useQuickLinks();

  const handleCancel = () => {
    navigate(createPageUrl("Homepage"));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <BackButton />

        <div className="grid md:grid-cols-3 gap-6">
          <ProfileOverviewCard user={user} onLogout={logout} />
          <ProfileEditForm
            formData={formData}
            saving={saving}
            onSubmit={handleSubmit}
            onChange={updateFormData}
            onCancel={handleCancel}
          />
        </div>

        <QuickLinksSection links={quickLinks} />
      </div>
    </div>
  );
}
