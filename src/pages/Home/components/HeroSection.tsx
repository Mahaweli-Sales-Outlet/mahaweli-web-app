import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { createPageUrl } from "@/utils";
import { HERO_IMAGE } from "../constants";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
              Authentic Sri Lankan Products
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pure & Natural <br />
              <span className="text-green-500">Traditional Goodness</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              From fresh dairy and spices to traditional sweets. Discover the
              finest Sri Lankan heritage products delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to={createPageUrl("Products")}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to={createPageUrl("About")}
                className="w-full sm:w-auto border-2 border-gray-200 hover:border-green-500 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl transform rotate-6" />
            <img
              src={HERO_IMAGE}
              alt="Traditional Sri Lankan spices"
              className="relative rounded-3xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
