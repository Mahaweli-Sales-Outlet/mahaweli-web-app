import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/client";
import type { Product } from "@/types";

export function useProduct(productId: string | null) {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productApi.getAll();
      return response.data;
    },
    enabled: !!productId,
  });

  const product = (products as Product[]).find(
    (p) => String(p.id) === productId
  );

  return {
    product,
    isLoading,
    error,
  };
}
