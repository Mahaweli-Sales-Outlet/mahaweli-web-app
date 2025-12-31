import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface ProfileOverviewCardProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export function ProfileOverviewCard({
  user,
  onLogout,
}: ProfileOverviewCardProps) {
  return (
    <Card className="md:col-span-1">
      <CardContent className="p-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{user.email}</p>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            {user.role === "admin" ? "Administrator" : "Customer"}
          </div>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full mt-6 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
