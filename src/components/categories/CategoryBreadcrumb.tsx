/**
 * CategoryBreadcrumb Component
 * Shows current category path with navigation
 */

import { ChevronRight } from "lucide-react";
import type { Category } from "@/types/category.types";

interface CategoryBreadcrumbProps {
  categories: Category[];
  onSelectCategory?: (categoryId: string) => void;
}

export default function CategoryBreadcrumb({
  categories,
  onSelectCategory,
}: CategoryBreadcrumbProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => onSelectCategory?.(categories[0].id)}
        className="text-blue-600 hover:underline"
      >
        All Categories
      </button>

      {categories.map((category, index) => (
        <div key={category.id} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === categories.length - 1 ? (
            <span className="text-gray-700 font-medium">{category.name}</span>
          ) : (
            <button
              onClick={() => onSelectCategory?.(category.id)}
              className="text-blue-600 hover:underline"
            >
              {category.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
