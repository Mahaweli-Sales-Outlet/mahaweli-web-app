import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ProductFormData } from "../constants";

interface ProductAdvancedFieldsProps {
  formData: ProductFormData;
  onFormChange: (data: Partial<ProductFormData>) => void;
}

export function ProductAdvancedFields({
  formData,
  onFormChange,
}: ProductAdvancedFieldsProps) {
  return (
    <>
      {/* Stock Quantity */}
      <div className="space-y-2">
        <Label htmlFor="stock_quantity">Stock Quantity</Label>
        <Input
          id="stock_quantity"
          type="number"
          value={formData.stock_quantity}
          onChange={(e) =>
            onFormChange({ stock_quantity: Number(e.target.value) })
          }
          placeholder="0"
          className="h-12"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="featured" className="text-base">
              Featured Product
            </Label>
            <p className="text-sm text-gray-600">Show on homepage</p>
          </div>
          <Switch
            id="featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) =>
              onFormChange({ is_featured: checked })
            }
          />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <Label htmlFor="is_active" className="text-base">
              Active Product
            </Label>
            <p className="text-sm text-gray-600">Available for sale</p>
          </div>
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) =>
              onFormChange({ is_active: checked })
            }
          />
        </div>
      </div>
    </>
  );
}
