import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone } from "lucide-react";

export default function ContactCTA() {
  return (
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
  );
}
