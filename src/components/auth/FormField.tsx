import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon: LucideIcon;
  required?: boolean;
}

export default function FormField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-10 ${error ? "border-red-500" : ""}`}
          required={required}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
