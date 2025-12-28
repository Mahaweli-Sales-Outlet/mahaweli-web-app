import React from "react";
import { Check } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange?.(category)}
          className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
            value === category
              ? "bg-green-50 text-green-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span>{category}</span>
          {value === category && <Check className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
