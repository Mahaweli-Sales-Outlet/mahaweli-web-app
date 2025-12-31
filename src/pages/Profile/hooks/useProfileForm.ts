import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateProfileThunk,
  selectUser,
  selectAuthError,
} from "@/redux/slices/authSlice";
import type { ProfileFormData } from "../types";

export function useProfileForm(
  formData: ProfileFormData,
  onSuccess: () => Promise<void>
) {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const [saving, setSaving] = useState(false);

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
      const result = await dispatch(
        updateProfileThunk({
          phone: formData.phone,
          address: formData.address,
        })
      );

      if (updateProfileThunk.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        await onSuccess();
      } else if (updateProfileThunk.rejected.match(result)) {
        toast.error(
          authError || "Failed to update profile"
        );
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    handleSubmit,
  };
}
