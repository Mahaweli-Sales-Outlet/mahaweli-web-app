import { useState, useEffect, useMemo } from "react";
import type { Product } from "@/types/product.types";

export function useProductFilters(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    // Ensure products is an array
    const productList = Array.isArray(products) ? products : [];
    
    return productList.filter((product) => {
      // Handle Featured category filter
      if (selectedCategory === "Featured") {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return product.is_featured && matchesSearch;
      }

      // Handle other categories - support both old 'category' and new 'category_name'
      const productCategory = (product as any).category_name || (product as any).category || "";
      const matchesCategory =
        !selectedCategory || productCategory === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const clearSearch = () => setSearchQuery("");
  const toggleFilters = () => setShowFilters((prev) => !prev);
  const selectCategoryAndCloseFilters = (category: string) => {
    setSelectedCategory(category);
    setShowFilters(false);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showFilters,
    toggleFilters,
    filteredProducts,
    clearSearch,
    selectCategoryAndCloseFilters,
  };
}
