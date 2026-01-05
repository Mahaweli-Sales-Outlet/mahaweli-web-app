import CategoryFilter from "@/components/CategoryFilter";
import { DEFAULT_CATEGORIES } from "../constants";

interface ProductsSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProductsSidebar({
  selectedCategory,
  onCategoryChange,
}: ProductsSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
        <CategoryFilter
          categories={DEFAULT_CATEGORIES}
          value={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>
    </aside>
  );
}
