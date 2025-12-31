import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/client";
import type { Product } from "@/types";

export function useProducts() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productApi.getAll();
      return response.data;
    },
  });

  return {
    products: products as Product[],
    isLoading,
    error,
  };
}
