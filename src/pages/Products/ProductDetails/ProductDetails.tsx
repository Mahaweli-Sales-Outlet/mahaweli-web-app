import { useNavigate, useParams } from "react-router-dom";
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
  const { id: productId } = useParams<{ id: string }>();

  const { product } = useProduct(productId || null);
  const { quantity, adding, incrementQuantity, decrementQuantity, addToCart } = useCart();

  const inStock = product ? product.stock_quantity > 0 : false;

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
                inStock={inStock}
                stockCount={product.stock_quantity}
              />
              
              {inStock && (
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
                  inStock={inStock}
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
