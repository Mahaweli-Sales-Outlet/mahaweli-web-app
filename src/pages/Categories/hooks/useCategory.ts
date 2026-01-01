/**
 * useCategory Hook
 * Handles category-specific operations
 */

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategoryByIdThunk,
  fetchCategoryChildrenThunk,
  selectSelectedCategory,
  selectCategoryChildren,
  selectCategoryLoading,
  selectCategoryError,
} from "@/redux/slices/categorySlice";

export function useCategory(categoryId?: string) {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const children = useAppSelector(selectCategoryChildren);
  const loading = useAppSelector(selectCategoryLoading);
  const error = useAppSelector(selectCategoryError);

  const fetchCategory = async (id: string) => {
    await dispatch(fetchCategoryByIdThunk(id));
  };

  const fetchChildren = async (parentId: string) => {
    await dispatch(fetchCategoryChildrenThunk(parentId));
  };

  return {
    selectedCategory,
    children,
    loading,
    error,
    fetchCategory,
    fetchChildren,
  };
}
