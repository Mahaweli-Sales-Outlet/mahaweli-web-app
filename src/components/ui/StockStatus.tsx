import { CheckCircle, XCircle } from "lucide-react";

interface StockStatusProps {
  inStock: boolean;
  stockCount?: number;
  inStockLabel?: string;
  outOfStockLabel?: string;
  className?: string;
}

export default function StockStatus({
  inStock,
  stockCount,
  inStockLabel = "In Stock",
  outOfStockLabel = "Out of Stock",
  className = "",
}: StockStatusProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl ${className}`}>
      {inStock ? (
        <>
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {inStockLabel}
            </p>
            {stockCount !== undefined && stockCount > 0 && (
              <p className="text-xs sm:text-sm text-gray-600">
                {stockCount} items available
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {outOfStockLabel}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Currently unavailable
            </p>
          </div>
        </>
      )}
    </div>
  );
}
