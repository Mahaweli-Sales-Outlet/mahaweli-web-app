import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFeaturedProductsThunk,
  selectFeaturedProducts,
  selectProductLoading,
  selectProductError,
} from "@/redux/slices/productSlice";

export function useFeaturedProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFeaturedProducts);
  const isLoading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    console.log("📦 HomePage useFeaturedProducts - Fetching featured products");
    dispatch(fetchFeaturedProductsThunk(8));
  }, [dispatch]);

  // Filter for featured and in-stock products
  const featuredProducts = Array.isArray(products)
    ? products.filter((p) => p.is_featured && p.stock_quantity > 0)
    : [];

  console.log("📦 HomePage useFeaturedProducts - Featured products:", {
    products,
    featuredProducts,
    isLoading,
    error,
  });

  return {
    featuredProducts,
    isLoading,
    error,
  };
}
