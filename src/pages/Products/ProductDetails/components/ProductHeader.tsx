import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/product.types";

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
        <Badge
          variant="outline"
          className="text-green-600 border-green-300 text-xs sm:text-sm"
        >
          <Tag className="w-3 h-3 mr-1" />
          {product.category_name || "Uncategorized"}
        </Badge>
        {product.brand && product.brand !== "N/A" && (
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-300 text-xs sm:text-sm"
          >
            {product.brand}
          </Badge>
        )}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
        {product.name}
      </h1>
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">Price (LKR)</p>
          <p className="text-3xl sm:text-4xl font-bold text-green-500">
            {Number(product.price || 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
