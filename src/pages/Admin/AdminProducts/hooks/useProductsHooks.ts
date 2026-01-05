import { useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductsThunk,
  deleteProductThunk,
  adjustStockThunk,
  selectProducts,
  selectProductLoading,
  selectProductError,
} from "@/redux/slices/productSlice";
import type { StockAdjustmentDTO } from "@/types/product.types";

/**
 * Fetch all products from Redux
 * Dispatches fetchProductsThunk on mount
 */
export const useProductsData = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProductsThunk({}));
  }, [dispatch]);

  return { products: products || [], isLoading: loading, error };
};

/**
 * Extract unique categories from products
 */
export const useProductCategories = (products: any[]) => {
  return useMemo(() => {
    if (!Array.isArray(products)) return [];
    
    const set = new Set<string>();
    for (const p of products) {
      // Try category_name, category_id, or use default
      const category = p?.category_name || p?.category_id || "Uncategorized";
      if (category && typeof category === "string") {
        set.add(category);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);
};

/**
 * Delete a single product via Redux
 */
export const useDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  const deleteProduct = async (productId: string) => {
    const result = await dispatch(deleteProductThunk(productId));
    return deleteProductThunk.fulfilled.match(result);
  };

  return { deleteProduct, loading, error };
};

/**
 * Adjust product stock via Redux
 */
export const useStockAdjustment = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  const adjustStock = async (productId: string, data: StockAdjustmentDTO) => {
    const result = await dispatch(adjustStockThunk({ id: productId, data }));
    return adjustStockThunk.fulfilled.match(result);
  };

  return { adjustStock, loading, error };
};

/**
 * Bulk operations (delete multiple, update multiple)
 */
export const useBulkOperations = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  const deleteBulk = async (productIds: string[]) => {
    try {
      const results = await Promise.all(
        productIds.map((id) => dispatch(deleteProductThunk(id)))
      );
      return results.every((r) => deleteProductThunk.fulfilled.match(r));
    } catch (err) {
      console.error("Bulk delete error:", err);
      return false;
    }
  };

  return { deleteBulk, loading, error };
};

/**
 * Filter products by search, category, and stock status
 */
export const useProductFilters = (
  products: any[],
  searchQuery: string,
  categoryFilter: string,
  stockFilter: string
) => {
  return useMemo(() => {
    if (!Array.isArray(products)) return [];
    
    return products.filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        product.category_name === categoryFilter ||
        product.category_id === categoryFilter;

      const inStock = product.stock_quantity > 0;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && inStock) ||
        (stockFilter === "out_of_stock" && !inStock);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);
};
