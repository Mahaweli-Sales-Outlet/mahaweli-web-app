import { UserPlus } from "lucide-react";

export default function RegisterHeader() {
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="text-2xl text-center font-semibold">Create Account</h2>
      <p className="text-center text-sm text-gray-600">
        Join Mahaweli Sales Outlet today
      </p>
    </>
  );
}
