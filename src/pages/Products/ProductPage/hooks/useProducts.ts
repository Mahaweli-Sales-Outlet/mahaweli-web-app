import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/products";
import type { Product } from "@/types/product.types";

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await productApi.getAll();
      // Handle paginated response - extract the data array
      return result.data || result || [];
    },
  });

  // Ensure products is always an array
  const products = Array.isArray(data) ? data : [];

  return {
    products: products as Product[],
    isLoading,
    error,
  };
}
