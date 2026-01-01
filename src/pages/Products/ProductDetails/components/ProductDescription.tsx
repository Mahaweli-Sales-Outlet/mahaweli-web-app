import { DEFAULT_PRODUCT_DESCRIPTION } from "../constants";
import type { Product } from "@/types/product.types";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
        Product Description
      </h2>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {product.description || DEFAULT_PRODUCT_DESCRIPTION}
      </p>
    </div>
  );
}
