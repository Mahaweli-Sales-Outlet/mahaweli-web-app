import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Truck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Experience the Difference?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of families in Kurunegala enjoying authentic Sri Lankan
          products
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={createPageUrl("Products")}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
          >
            <Truck className="w-5 h-5" />
            Shop Now
          </Link>
          <Link
            to={createPageUrl("Contact")}
            className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-green-500 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
