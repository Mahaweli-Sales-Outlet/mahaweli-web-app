import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import StockStatus from "@/components/ui/StockStatus";
import AddToCartButton from "@/components/ui/AddToCartButton";
import {
  ProductImage,
  ProductHeader,
  ProductDescription,
  ProductFeatures,
} from "./components";
import { useProduct, useCart } from "./hooks";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    setProductId(id);
  }, []);

  const { product } = useProduct(productId);
  const { quantity, adding, incrementQuantity, decrementQuantity, addToCart } = useCart();

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
            <ProductImage product={product} />

            <div className="space-y-4 sm:space-y-6">
              <ProductHeader product={product} />
              <StockStatus
                inStock={product.in_stock ?? false}
                stockCount={product.stock}
              />
              
              {product.in_stock && (
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />
              )}

              <ProductDescription product={product} />
              <ProductFeatures />
              
              <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                <AddToCartButton
                  inStock={product.in_stock ?? false}
                  loading={adding}
                  onClick={addToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
