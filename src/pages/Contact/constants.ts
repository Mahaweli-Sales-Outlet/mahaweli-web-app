import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const contactInfo = [
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

export const faqs = [
  {
    question: "Do you deliver in Kurunegala?",
    answer: "Yes, we deliver throughout Kurunegala and surrounding areas.",
  },
  {
    question: "Are your products certified?",
    answer:
      "All products are from Mahaweli Authority and government-certified suppliers.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash on delivery, bank transfers, and online payments.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Contact us via WhatsApp, phone, or visit our store to place your order.",
  },
];

export const whatsappNumber = "+94772345678";
export const phoneContacts = [
  { label: "+94 37 222 2345", href: "tel:+94372222345" },
  { label: "+94 77 234 5678", href: "tel:+94772345678" },
];

export const emailContacts = [
  {
    label: "kurunegala@mahaweli.lk",
    href: "mailto:kurunegala@mahaweli.lk",
  },
  { label: "info@mahaweli.lk", href: "mailto:info@mahaweli.lk" },
];
