import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileEditFormProps {
  formData: ProfileFormData;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof ProfileFormData, value: string) => void;
  onCancel: () => void;
}

export function ProfileEditForm({
  formData,
  saving,
  onSubmit,
  onChange,
  onCancel,
}: ProfileEditFormProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Full Name
            </Label>
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              disabled
              className="bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Contact admin to change your name
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Email address cannot be changed
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Delivery Address
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your full delivery address"
              value={formData.address}
              onChange={(e) => onChange("address", e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              This will be used as your default delivery address
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
