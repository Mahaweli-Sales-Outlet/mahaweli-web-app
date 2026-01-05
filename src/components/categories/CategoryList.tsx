/**
 * CategoryList Component
 * Displays categories in a grid or list layout
 */

import type { CategoryWithChildrenResponse } from "@/types/category.types";

interface CategoryListProps {
  categories: CategoryWithChildrenResponse[];
  onSelectCategory?: (category: CategoryWithChildrenResponse) => void;
  layout?: "grid" | "list";
}

export default function CategoryList({
  categories,
  onSelectCategory,
  layout = "grid",
}: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          : "space-y-2"
      }
    >
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory?.(category)}
          className="cursor-pointer transition-all"
        >
          <div
            className="rounded-lg p-4 text-center h-full flex flex-col items-center justify-center"
            style={{
              backgroundColor: category.color_code
                ? `${category.color_code}20`
                : "var(--color-gray-100)",
              borderLeft: category.color_code
                ? `4px solid ${category.color_code}`
                : "none",
            }}
          >
            {category.icon_url && (
              <img
                src={category.icon_url}
                alt={category.name}
                className="w-12 h-12 mb-2 object-contain"
              />
            )}
            <h3 className="font-semibold text-sm md:text-base text-gray-800">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {category.description}
              </p>
            )}
            {category.children && category.children.length > 0 && (
              <span className="text-xs text-gray-500 mt-2">
                {category.children.length} subcategories
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
