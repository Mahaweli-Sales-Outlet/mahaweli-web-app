import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api/products";
import type { Product } from "@/types/product.types";

export function useProduct(productId: string | null) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Use getById for single product fetch
      const result = await productApi.getById(productId!);
      return result;
    },
    enabled: !!productId,
  });

  return {
    product: product as Product | undefined,
    isLoading,
    error,
  };
}
