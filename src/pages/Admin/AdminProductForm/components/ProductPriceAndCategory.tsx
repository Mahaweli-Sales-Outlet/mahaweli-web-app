import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES, type ProductFormData } from "../constants";

interface ProductPriceAndCategoryProps {
  formData: ProductFormData;
  onFormChange: (data: Partial<ProductFormData>) => void;
}

export function ProductPriceAndCategory({
  formData,
  onFormChange,
}: ProductPriceAndCategoryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="price">Price (LKR) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => onFormChange({ price: e.target.value })}
          placeholder="0.00"
          required
          className="h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => onFormChange({ category: e.target.value })}
          className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
