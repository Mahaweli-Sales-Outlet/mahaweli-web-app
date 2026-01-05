import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
          Experience Authentic Sri Lankan Quality
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
          Join thousands enjoying pure, traditional products from Mahaweli Authority
        </p>
        <Link
          to={createPageUrl("Products")}
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all transform hover:scale-105 shadow-xl"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
}
