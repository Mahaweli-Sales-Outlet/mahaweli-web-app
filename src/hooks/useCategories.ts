/**
 * useCategories Hook
 * Handles fetching and managing categories from Redux
 */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCategoriesThunk,
  fetchTopLevelCategoriesThunk,
  selectAllCategories,
  selectTopLevelCategories,
  selectCategoryLoading,
  selectCategoryError,
} from "@/redux/slices/categorySlice";

export function useCategories(includeInactive = false) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectCategoryLoading);
  const error = useAppSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategoriesThunk(includeInactive));
  }, [dispatch, includeInactive]);

  return { categories, loading, error };
}

export function useTopLevelCategories() {
  const dispatch = useAppDispatch();
  const topLevelCategories = useAppSelector(selectTopLevelCategories);
  const loading = useAppSelector(selectCategoryLoading);
  const error = useAppSelector(selectCategoryError);

  useEffect(() => {
    if (topLevelCategories.length === 0) {
      dispatch(fetchTopLevelCategoriesThunk());
    }
  }, [dispatch, topLevelCategories.length]);

  return { topLevelCategories, loading, error };
}
