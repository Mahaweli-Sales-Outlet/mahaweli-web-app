import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/api";

export const useProductsData = () => {
  const { data: result, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productApi.getAll(),
  });

  // Extract and map products from paginated result
  const products = useMemo(() => {
    // Handle different response shapes
    // 1) direct array
    // 2) { data: [...] }
    // 3) { data: { data: [...], pagination } }
    let rawProducts: any[] = [];

    if (Array.isArray(result)) {
      rawProducts = result;
    } else if (Array.isArray((result as any)?.data)) {
      rawProducts = (result as any).data;
    } else if (Array.isArray((result as any)?.data?.data)) {
      rawProducts = (result as any).data.data;
    }
    return rawProducts.map((p: any) => ({
      ...p,
      category: p.category_name || p.category_id || "Uncategorized",
      in_stock: p.stock_quantity > 0,
      featured: p.is_featured,
    }));
  }, [result]);

  return { products, isLoading };
};

export const useProductCategories = (products: any[]) => {
  return useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      const category = p?.category || p?.category_name;
      if (category && typeof category === "string") {
        set.add(category);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};

export const useStockAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: any }) => 
      productApi.adjustStock(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
};

export const useBulkOperations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (productIds: string[]) => {
      await Promise.all(productIds.map((id) => productApi.delete(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ productIds, updates }: { productIds: string[]; updates: any }) => {
      await Promise.all(productIds.map((id) => productApi.update(id, updates)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  return {
    deleteBulk: deleteMutation,
    updateBulk: updateMutation,
  };
};

export const useProductFilters = (
  products: any[],
  searchQuery: string,
  categoryFilter: string,
  stockFilter: string
) => {
  return useMemo(() => {
    return products.filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && product.in_stock) ||
        (stockFilter === "out_of_stock" && !product.in_stock);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);
};
