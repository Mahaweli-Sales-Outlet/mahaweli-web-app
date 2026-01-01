/**
 * Categories Page Main Component
 * Displays all categories with filtering and navigation
 */

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryList } from "@/components/categories";
import { CATEGORY_LAYOUT_OPTIONS } from "./constants";

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error loading categories</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Categories
          </h1>
          <p className="text-gray-600">
            Browse our {categories.length} product categories
          </p>
        </div>

        {/* Layout Toggle */}
        <div className="flex gap-2 mb-6">
          {CATEGORY_LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setLayout(opt)}
              className={`px-4 py-2 rounded transition-colors ${
                layout === opt
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt === "grid" ? "Grid View" : "List View"}
            </button>
          ))}
        </div>

        {/* Categories List */}
        {categories.length > 0 ? (
          <CategoryList categories={categories} layout={layout} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}
