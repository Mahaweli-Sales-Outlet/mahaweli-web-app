import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Tag,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    setProductId(id);
  }, []);

  useEffect(() => {
    // TODO: Replace with real auth API call
    setUser(null);
  }, []);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // TODO: Replace with real API call to base44Client
      return [];
    },
  });

  const product = (products as Product[]).find(
    (p) => String(p.id) === productId
  );

  const handleAddToCart = async () => {
    if (!user) {
      // TODO: Replace with real auth redirect
      return;
    }

    setAdding(true);
    // TODO: Implement add to cart with API
    setTimeout(() => {
      navigate(createPageUrl("Cart"));
      setAdding(false);
    }, 500);
  };

  if (!productId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Product not found</p>
          <button
            onClick={() => navigate(createPageUrl("Products"))}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <button
          onClick={() => navigate(createPageUrl("Products"))}
          className="mb-4 sm:mb-6 hover:bg-gray-100 text-xs sm:text-sm px-3 py-2 rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Product Image - Mobile Optimized */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={
                    product.image_url ||
                    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=800&fit=crop"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.featured && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <Badge className="bg-green-500 text-white border-0 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-300 text-xs sm:text-sm"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {product.category}
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
                    <p className="text-xs sm:text-sm text-gray-500">
                      Price (LKR)
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-green-500">
                      {product.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stock Status - Mobile Optimized */}
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                {product.in_stock ? (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        In Stock
                      </p>
                      {product.stock && product.stock > 0 && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          {product.stock} items available
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Out of Stock
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Currently unavailable
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              {product.in_stock && (
                <div>
                  <label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 sm:p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </button>
                      <span className="px-4 sm:px-6 font-bold text-gray-900 text-base sm:text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 sm:p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Description - Mobile Optimized */}
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Product Description
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {product.description ||
                    "Authentic Sri Lankan product sourced from certified suppliers. Experience the natural taste and superior quality of traditional Sri Lankan heritage."}
                </p>
              </div>

              {/* Features - Mobile Optimized */}
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Why Choose This Product
                </h2>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>100% authentic Sri Lankan product</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Natural and traditional methods</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Sourced from certified suppliers</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Quality guaranteed</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || adding}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-5 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl disabled:bg-gray-300 flex items-center justify-center"
                >
                  {adding ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
