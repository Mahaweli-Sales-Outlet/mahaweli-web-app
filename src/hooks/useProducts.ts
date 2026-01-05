/**
 * Product Hooks
 * Custom hooks for product state management
 */

import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductsThunk,
  fetchProductByIdThunk,
  fetchFeaturedProductsThunk,
  fetchProductsByCategoryThunk,
  searchProductsThunk,
  selectProducts,
  selectFeaturedProducts,
  selectSelectedProduct,
  selectCategoryProducts,
  selectSearchResults,
  selectPagination,
  selectProductFilters,
  selectProductLoading,
  selectProductError,
  setFilters,
  clearFilters,
  clearSearchResults,
} from "@/redux/slices/productSlice";
import type { ProductFilters } from "@/types/product.types";

/**
 * Hook for fetching and managing products list
 */
export function useProducts(initialFilters?: ProductFilters) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const pagination = useAppSelector(selectPagination);
  const filters = useAppSelector(selectProductFilters);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProductsThunk(initialFilters || filters));
  }, [dispatch]); // Only fetch on mount

  const refetch = useCallback(
    (newFilters?: ProductFilters) => {
      const filtersToUse = newFilters || filters;
      dispatch(setFilters(filtersToUse));
      dispatch(fetchProductsThunk(filtersToUse));
    },
    [dispatch, filters]
  );

  const updateFilters = useCallback(
    (newFilters: ProductFilters) => {
      dispatch(setFilters(newFilters));
      dispatch(fetchProductsThunk(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(fetchProductsThunk({}));
  }, [dispatch]);

  const goToPage = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      dispatch(setFilters(newFilters));
      dispatch(fetchProductsThunk(newFilters));
    },
    [dispatch, filters]
  );

  return {
    products,
    pagination,
    filters,
    loading,
    error,
    refetch,
    updateFilters,
    resetFilters,
    goToPage,
  };
}

/**
 * Hook for fetching a single product
 */
export function useProduct(productId?: string) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductByIdThunk(productId));
    }
  }, [dispatch, productId]);

  const refetch = useCallback(() => {
    if (productId) {
      dispatch(fetchProductByIdThunk(productId));
    }
  }, [dispatch, productId]);

  return { product, loading, error, refetch };
}

/**
 * Hook for featured products
 */
export function useFeaturedProducts(limit: number = 8) {
  const dispatch = useAppDispatch();
  const featuredProducts = useAppSelector(selectFeaturedProducts);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (featuredProducts.length === 0) {
      dispatch(fetchFeaturedProductsThunk(limit));
    }
  }, [dispatch, featuredProducts.length, limit]);

  const refetch = useCallback(() => {
    dispatch(fetchFeaturedProductsThunk(limit));
  }, [dispatch, limit]);

  return { featuredProducts, loading, error, refetch };
}

/**
 * Hook for products by category
 */
export function useProductsByCategory(categoryId?: string) {
  const dispatch = useAppDispatch();
  const categoryProducts = useAppSelector(selectCategoryProducts);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategoryThunk(categoryId));
    }
  }, [dispatch, categoryId]);

  const refetch = useCallback(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategoryThunk(categoryId));
    }
  }, [dispatch, categoryId]);

  return { products: categoryProducts, loading, error, refetch };
}

/**
 * Hook for product search
 */
export function useProductSearch() {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  const search = useCallback(
    (query: string, limit?: number) => {
      if (query.trim()) {
        dispatch(searchProductsThunk({ query, limit }));
      } else {
        dispatch(clearSearchResults());
      }
    },
    [dispatch]
  );

  const clearResults = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return { searchResults, loading, error, search, clearResults };
}
