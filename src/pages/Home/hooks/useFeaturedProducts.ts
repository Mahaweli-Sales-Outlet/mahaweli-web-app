import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/client";
import type { Product } from "@/types";

export function useFeaturedProducts() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await productApi.getAll();
      return response.data;
    },
  });

  const featuredProducts = (products as Product[]).filter(
    (p) => p.featured && p.in_stock
  );

  return {
    featuredProducts,
    isLoading,
    error,
  };
}
