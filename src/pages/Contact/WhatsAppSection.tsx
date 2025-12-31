import { MessageCircle } from "lucide-react";

const whatsappNumber = "+94772345678";
const whatsappMessage = encodeURIComponent(
  "Hello! I would like to inquire about your products."
);
const whatsappLink = `https://wa.me/${whatsappNumber.replace(
  /[^0-9]/g,
  ""
)}?text=${whatsappMessage}`;

export default function WhatsAppSection() {
  return (
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
  );
}
