import { Search, SlidersHorizontal, X } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import { DEFAULT_CATEGORIES } from "../constants";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  onClearSearch,
  showFilters,
  onToggleFilters,
  selectedCategory,
  onCategoryChange,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm mb-4 sm:mb-6">
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 sm:pl-12 h-10 sm:h-11 md:h-12 bg-gray-50 border border-gray-200 focus:border-green-500 rounded-lg sm:rounded-xl text-sm sm:text-base"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={onToggleFilters}
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
            categories={DEFAULT_CATEGORIES}
            value={selectedCategory}
            onChange={onCategoryChange}
          />
        </div>
      )}
    </div>
  );
}
