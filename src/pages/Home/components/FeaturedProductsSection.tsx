import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {products.length} handpicked favorites from our collection
            </p>
          </div>
          <Link
            to={`${createPageUrl("Products")}?category=Featured`}
            className="text-green-500 hover:text-green-600 font-semibold flex items-center gap-1 sm:gap-2 group text-xs sm:text-sm md:text-base"
          >
            <span className="hidden sm:inline">View All</span>
            <span className="sm:hidden">All</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative -mx-4 sm:-mx-6">
          <div className="overflow-x-auto px-4 sm:px-6 pb-4 scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 md:gap-6" style={{ width: "max-content" }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          {/* Gradient Overlays for scroll hint */}
          <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
