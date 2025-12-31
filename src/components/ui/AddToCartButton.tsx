import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  inStock: boolean;
  loading?: boolean;
  onClick: () => void;
  label?: string;
  loadingLabel?: string;
  className?: string;
  fullWidth?: boolean;
}

export default function AddToCartButton({
  inStock,
  loading = false,
  onClick,
  label = "Add to Cart",
  loadingLabel = "Adding...",
  className = "",
  fullWidth = true,
}: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!inStock || loading}
      className={`${fullWidth ? "flex-1" : ""} bg-green-500 hover:bg-green-600 text-white py-5 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl disabled:bg-gray-300 flex items-center justify-center ${className}`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
          {loadingLabel}
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {label}
        </>
      )}
    </button>
  );
}
