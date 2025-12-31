import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProductFormData } from "../constants";

interface ProductBasicFieldsProps {
  formData: ProductFormData;
  onFormChange: (data: Partial<ProductFormData>) => void;
}

export function ProductBasicFields({
  formData,
  onFormChange,
}: ProductBasicFieldsProps) {
  return (
    <>
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFormChange({ name: e.target.value })}
          placeholder="e.g., Pure Coconut Oil, Kitul Treacle"
          required
          className="h-12"
        />
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={formData.brand}
          onChange={(e) => onFormChange({ brand: e.target.value })}
          placeholder="e.g., Mahaweli, NLDB"
          className="h-12"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormChange({ description: e.target.value })}
          placeholder="Describe your product..."
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 resize-none"
        />
      </div>
    </>
  );
}
