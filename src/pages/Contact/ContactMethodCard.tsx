import type { LucideIcon } from "lucide-react";

interface ContactMethodCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contacts: { label: string; href: string }[];
  color: string;
}

export default function ContactMethodCard({
  icon: Icon,
  title,
  description,
  contacts,
  color,
}: ContactMethodCardProps) {
  return (
    <div className="border-0 shadow-sm rounded-2xl bg-white">
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 ${color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              {description}
            </p>
            <div className="space-y-2">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  className="block text-sm sm:text-base font-semibold hover:opacity-80 transition-opacity"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
