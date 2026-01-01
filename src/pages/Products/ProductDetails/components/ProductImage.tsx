import { Badge } from "@/components/ui/Badge";
import { DEFAULT_PRODUCT_IMAGE } from "../constants";
import type { Product } from "@/types/product.types";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={product.image_url || DEFAULT_PRODUCT_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.is_featured && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <Badge className="bg-green-500 text-white border-0 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm">
              Featured
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
