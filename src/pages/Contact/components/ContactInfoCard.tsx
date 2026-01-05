import type { LucideIcon } from "lucide-react";

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  details: string[];
  color: string;
}

export default function ContactInfoCard({
  icon: Icon,
  title,
  details,
  color,
}: ContactInfoCardProps) {
  return (
    <div className="border-0 shadow-sm hover:shadow-lg transition-shadow rounded-2xl bg-white">
      <div className="p-4 sm:p-6 text-center">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${color} rounded-2xl mb-3 sm:mb-4`}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
          {title}
        </h3>
        {details.map((detail, idx) => (
          <p key={idx} className="text-gray-600 text-xs sm:text-sm">
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
}
