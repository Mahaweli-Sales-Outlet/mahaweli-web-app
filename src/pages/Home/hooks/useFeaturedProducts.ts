import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/products";
import type { Product } from "@/types/product.types";

export function useFeaturedProducts() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      // getFeatured already returns Product[] directly
      const result = await productApi.getFeatured();
      return Array.isArray(result) ? result : [];
    },
  });

  const productList = Array.isArray(products) ? products : [];
  // Filter for featured and in-stock products
  const featuredProducts = productList.filter(
    (p: Product) => p.is_featured && p.stock_quantity > 0
  );

  return {
    featuredProducts,
    isLoading,
    error,
  };
}
