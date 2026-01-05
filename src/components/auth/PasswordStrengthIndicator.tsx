import type { CheckCircle2 } from "lucide-react";
import { CheckCircle2 as CheckCircle2Icon } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  strength: {
    [key: string]: boolean;
  };
  requirements: Array<{
    key: string;
    label: string;
  }>;
}

export default function PasswordStrengthIndicator({
  strength,
  requirements,
}: PasswordStrengthIndicatorProps) {
  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md space-y-1">
      <p className="text-xs font-medium text-gray-700 mb-2">
        Password must contain:
      </p>
      {requirements.map(({ key, label }) => {
        const isMet = strength[key];
        return (
          <div key={key} className="flex items-center gap-2">
            {isMet ? (
              <CheckCircle2Icon className="w-4 h-4 text-green-600" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={`text-xs ${
                isMet ? "text-green-600" : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
