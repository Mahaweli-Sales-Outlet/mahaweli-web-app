import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProductFormData } from "../constants";
import type { Category } from "@/types/category.types";

interface ProductPriceAndCategoryProps {
  formData: ProductFormData;
  onFormChange: (data: Partial<ProductFormData>) => void;
  errors?: { [key: string]: string };
  categories: Category[];
  loading?: boolean;
}

export function ProductPriceAndCategory({
  formData,
  onFormChange,
  errors = {},
  categories,
  loading = false,
}: ProductPriceAndCategoryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="price">Price (LKR) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => onFormChange({ price: e.target.value })}
          placeholder="0.00"
          required
          className={`h-12 ${errors.price ? "border-red-500" : ""}`}
        />
        {errors.price && (
          <p className="text-sm text-red-600">{errors.price}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <select
          id="category"
          value={formData.category_id}
          onChange={(e) => onFormChange({ category_id: e.target.value })}
          disabled={loading}
          className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
