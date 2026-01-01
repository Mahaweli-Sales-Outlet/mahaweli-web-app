import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product.types";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 animate-pulse"
        >
          <div className="bg-gray-200 aspect-square rounded-lg sm:rounded-xl mb-3 sm:mb-4" />
          <div className="bg-gray-200 h-4 sm:h-5 md:h-6 rounded mb-2" />
          <div className="bg-gray-200 h-3 sm:h-4 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-center">
      <p className="text-gray-500 text-sm sm:text-base md:text-lg">
        No products found matching your criteria
      </p>
    </div>
  );
}

export default function ProductsGrid({ products, isLoading }: ProductsGridProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
