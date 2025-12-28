// TODO: Replace Card/CardContent with a simple div for now, or migrate a Card component later
// Remove Card/CardContent imports and usages
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

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

const whatsappNumber = "+94772345678";
const whatsappMessage = encodeURIComponent(
  "Hello! I would like to inquire about your products."
);
const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /[^0-9]/g,
  ""
)}?text=${whatsappMessage}`;

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Get in <span className="text-green-500">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Having questions about our products? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="border-0 shadow-sm hover:shadow-lg transition-shadow rounded-2xl bg-white"
              >
                <div className="p-4 sm:p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${info.color} rounded-2xl mb-3 sm:mb-4`}
                  >
                    <info.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-xs sm:text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Section - Main Feature */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-green-600 overflow-hidden rounded-2xl">
              <div className="p-6 sm:p-10 md:p-12 text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Chat with us on WhatsApp
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-green-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Get instant answers to your questions! Message us directly on
                  WhatsApp for quick support and product inquiries.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white text-green-600 hover:bg-green-50 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl transition-all transform hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  Start WhatsApp Chat
                </a>
                <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-green-100">
                  Available during business hours: Mon-Sat 8AM-8PM, Sun 9AM-6PM
                </p>
              </div>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Call Us Card */}
            <div className="border-0 shadow-sm rounded-2xl bg-white">
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Call Us Directly
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                      Prefer talking on the phone? Give us a call during
                      business hours.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+94372222345"
                        className="block text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-700"
                      >
                        +94 37 222 2345
                      </a>
                      <a
                        href="tel:+94772345678"
                        className="block text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-700"
                      >
                        +94 77 234 5678
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Us Card */}
            <div className="border-0 shadow-sm rounded-2xl bg-white">
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Email Us
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                      Send us a detailed inquiry and we'll respond within 24
                      hours.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="mailto:kurunegala@mahaweli.lk"
                        className="block text-sm sm:text-base font-semibold text-purple-600 hover:text-purple-700"
                      >
                        kurunegala@mahaweli.lk
                      </a>
                      <a
                        href="mailto:info@mahaweli.lk"
                        className="block text-sm sm:text-base font-semibold text-purple-600 hover:text-purple-700"
                      >
                        info@mahaweli.lk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Visit Us Section */}
          <div className="mt-12 sm:mt-16">
            <div className="border-0 shadow-sm overflow-hidden rounded-2xl bg-white">
              <div className="grid md:grid-cols-2">
                <div className="h-64 sm:h-80 md:h-full bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
                    alt="Map location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
                    <div className="text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        Visit Our Store
                      </h3>
                      <p className="text-sm sm:text-base text-green-100">
                        Mahaweli Sales Outlet, Kurunegala
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8 md:p-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Visit Us in Person
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Location
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          Mahaweli Sales Outlet
                          <br />
                          Kurunegala, Sri Lanka
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          Opening Hours
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          Mon - Sat: 8:00 AM - 8:00 PM
                          <br />
                          Sunday: 9:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Quick answers to common questions
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="border-0 shadow-sm rounded-2xl bg-white p-4 sm:p-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Do you deliver in Kurunegala?
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Yes, we deliver throughout Kurunegala and surrounding areas.
                </p>
              </div>
              <div className="border-0 shadow-sm rounded-2xl bg-white p-4 sm:p-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Are your products certified?
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  All products are from Mahaweli Authority and
                  government-certified suppliers.
                </p>
              </div>
              <div className="border-0 shadow-sm rounded-2xl bg-white p-4 sm:p-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  We accept cash on delivery, bank transfers, and online
                  payments.
                </p>
              </div>
              <div className="border-0 shadow-sm rounded-2xl bg-white p-4 sm:p-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  How can I place an order?
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Contact us via WhatsApp, phone, or visit our store to place
                  your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Browse our collection of authentic Sri Lankan products
          </p>
          <Link
            to={createPageUrl("Products")}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
