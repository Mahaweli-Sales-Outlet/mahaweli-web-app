import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactHero from "./ContactHero";
import ContactInfoCard from "./ContactInfoCard";
import WhatsAppSection from "./WhatsAppSection";
import ContactMethodCard from "./ContactMethodCard";
import VisitSection from "./VisitSection";
import FAQSection from "./FAQSection";
import ContactCTA from "./ContactCTA";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["Mahaweli Sales Outlet", "Kurunegala, Sri Lanka"],
    color: "from-green-400 to-green-600",
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+94 37 222 2345", "+94 77 234 5678"],
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["kurunegala@mahaweli.lk", "info@mahaweli.lk"],
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 8:00 AM - 8:00 PM", "Sunday: 9:00 AM - 6:00 PM"],
    color: "from-orange-400 to-orange-600",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <ContactInfoCard key={index} {...info} />
            ))}
          </div>

          <WhatsAppSection />

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <ContactMethodCard
              icon={Phone}
              title="Call Us Directly"
              description="Prefer talking on the phone? Give us a call during business hours."
              contacts={[
                { label: "+94 37 222 2345", href: "tel:+94372222345" },
                { label: "+94 77 234 5678", href: "tel:+94772345678" },
              ]}
              color="bg-blue-100 text-blue-600"
            />
            <ContactMethodCard
              icon={Mail}
              title="Email Us"
              description="Send us a detailed inquiry and we'll respond within 24 hours."
              contacts={[
                {
                  label: "kurunegala@mahaweli.lk",
                  href: "mailto:kurunegala@mahaweli.lk",
                },
                { label: "info@mahaweli.lk", href: "mailto:info@mahaweli.lk" },
              ]}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          <VisitSection />
          <FAQSection />
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
