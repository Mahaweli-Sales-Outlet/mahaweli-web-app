/**
 * Category API Integration
 */

import { api } from "./client";
import type { Category, CategoryWithChildrenResponse, CreateCategoryDTO, UpdateCategoryDTO } from "@/types/category.types";

export const categoryApi = {
  /**
   * Get all categories with optional hierarchy
   */
  getAllCategories: async (includeInactive = false): Promise<CategoryWithChildrenResponse[]> => {
    const response = await api.get("/categories", {
      params: { includeInactive },
    });
    return response.data.data || response.data;
  },

  /**
   * Get top-level (root) categories
   */
  getTopLevelCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories/top-level");
    return response.data.data || response.data;
  },

  /**
   * Get category by ID
   */
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data.data || response.data;
  },

  /**
   * Get children of a category
   */
  getCategoryChildren: async (parentId: string): Promise<Category[]> => {
    const response = await api.get(`/categories/${parentId}/children`);
    return response.data.data || response.data;
  },

  /**
   * Create a new category (Admin only)
   */
  createCategory: async (data: CreateCategoryDTO): Promise<Category> => {
    const response = await api.post("/categories", data);
    return response.data.data || response.data;
  },

  /**
   * Update a category (Admin only)
   */
  updateCategory: async (id: string, data: UpdateCategoryDTO): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data.data || response.data;
  },

  /**
   * Delete a category (Admin only)
   */
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
