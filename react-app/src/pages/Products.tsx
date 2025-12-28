import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Product } from "@/types";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // TODO: Replace with real API call to base44Client
      return [];
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const filteredProducts = (products as Product[]).filter((product) => {
    // Handle Featured category filter
    if (selectedCategory === "Featured") {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return product.featured && matchesSearch;
    }

    // Handle other categories
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-white border-b border-gray-100 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Our Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Browse our complete collection of farm-fresh goods
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex gap-4 md:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <CategoryFilter
                categories={[
                  "Featured",
                  "Dairy",
                  "Vegetables",
                  "Grains",
                  "Spices",
                ]}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm mb-4 sm:mb-6">
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-12 h-10 sm:h-11 md:h-12 bg-gray-50 border border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl text-sm sm:text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 h-10 sm:h-11 md:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl font-medium text-gray-700 transition-colors text-xs sm:text-sm md:text-base flex-shrink-0"
                >
                  <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <CategoryFilter
                    categories={[
                      "Featured",
                      "Dairy",
                      "Vegetables",
                      "Grains",
                      "Spices",
                    ]}
                    value={selectedCategory}
                    onChange={(cat: string) => {
                      setSelectedCategory(cat);
                      setShowFilters(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4 sm:mb-6 px-1">
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products
                {selectedCategory && (
                  <span className="ml-1">in {selectedCategory}</span>
                )}
              </p>
            </div>

            {/* Products Grid - Mobile Optimized */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 animate-pulse"
                  >
                    <div className="bg-gray-200 aspect-square rounded-lg sm:rounded-xl mb-3 sm:mb-4"></div>
                    <div className="bg-gray-200 h-4 sm:h-5 md:h-6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 sm:h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-center">
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  No products found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
