import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock_quantity > 0;
  
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={
            product.image_url ||
            "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=600&fit=crop"
          }
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-white text-gray-900 border-0 px-3 py-1.5 text-xs sm:text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
        {product.is_featured && inStock && (
          <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4">
            <Badge className="bg-green-500 text-white border-0 shadow-lg text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 fill-white" />
              Featured
            </Badge>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
          <Badge
            variant="outline"
            className="text-[9px] sm:text-xs border-gray-300 text-gray-600"
          >
            {product.category_name || "Uncategorized"}
          </Badge>
          {product.brand && product.brand !== "N/A" && (
            <Badge
              variant="outline"
              className="text-[9px] sm:text-xs border-green-300 text-green-600"
            >
              {product.brand}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 sm:mb-2 group-hover:text-green-500 transition-colors line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 leading-tight sm:leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">LKR</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500">
              {Number(product.price || 0).toFixed(2)}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
