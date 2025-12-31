import { DEMO_CREDENTIALS } from "../constants";

export default function DemoCredentials() {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600 font-semibold mb-2">
        Demo Credentials:
      </p>
      <p className="text-xs text-gray-600">
        Email: {DEMO_CREDENTIALS.email} | Password: {DEMO_CREDENTIALS.password}
      </p>
    </div>
  );
}
