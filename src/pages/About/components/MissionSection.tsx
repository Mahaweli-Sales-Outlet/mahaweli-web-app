import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Target } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-green-600">
              <Target className="w-6 h-6" />
              <span className="font-semibold uppercase text-sm tracking-wider">
                Our Mission
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Preserving Sri Lankan Heritage Through Quality Products
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              As an official Mahaweli Sales Outlet in Kurunegala, we believe in
              the power of authentic, traditional Sri Lankan products. Our
              mission is to connect families with the pure, natural goodness of
              products sourced directly from Mahaweli Authority and certified
              government farms.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We work exclusively with NLDB, Mahaweli Authority, and certified
              traditional artisans to ensure every product meets the highest
              standards of quality, authenticity, and taste.
            </p>
            <Link
              to={createPageUrl("Products")}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              Explore Our Products
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop"
              alt="Sri Lankan farm"
              className="relative rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
