import { Phone, Mail } from "lucide-react";
import {
  ContactHero,
  ContactInfoCard,
  WhatsAppSection,
  ContactMethodCard,
  VisitSection,
  FAQSection,
  ContactCTA,
} from "./components";
import { contactInfo, phoneContacts, emailContacts } from "./constants";

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
              contacts={phoneContacts}
              color="bg-blue-100 text-blue-600"
            />
            <ContactMethodCard
              icon={Mail}
              title="Email Us"
              description="Send us a detailed inquiry and we'll respond within 24 hours."
              contacts={emailContacts}
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
