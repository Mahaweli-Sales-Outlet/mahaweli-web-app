/**
 * Product API Integration
 * Syncs with Backend ProductQueryService and ProductMutationService
 */

import { api } from "./client";
import type {
  Product,
  ProductFilters,
  PaginatedResult,
  CreateProductDTO,
  UpdateProductDTO,
  StockAdjustmentDTO,
  StockAdjustmentResponse,
  LowStockProductResponse,
} from "@/types/product.types";

export const productApi = {
  // ============================================================================
  // Query Operations
  // ============================================================================

  /**
   * Get all products with filters and pagination
   */
  getAll: async (filters?: ProductFilters): Promise<PaginatedResult<Product>> => {
    const response = await api.get("/products", { params: filters });
    return response.data.data || response.data;
  },

  /**
   * Get a single product by ID
   */
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data || response.data;
  },

  /**
   * Get a product by barcode (for POS scanning)
   */
  getByBarcode: async (barcode: string): Promise<Product> => {
    const response = await api.get(`/products/barcode/${barcode}`);
    return response.data.data || response.data;
  },

  /**
   * Search products by name, brand, or barcode
   */
  search: async (query: string, limit?: number): Promise<Product[]> => {
    const response = await api.get("/products/search", {
      params: { q: query, limit },
    });
    return response.data.data || response.data;
  },

  /**
   * Get products with low stock
   */
  getLowStock: async (): Promise<LowStockProductResponse[]> => {
    const response = await api.get("/products/low-stock");
    return response.data.data || response.data;
  },

  /**
   * Get products by category
   */
  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data.data || response.data;
  },

  /**
   * Get featured products
   */
  getFeatured: async (limit?: number): Promise<Product[]> => {
    const response = await api.get("/products", {
      params: { is_featured: true, limit: limit || 8 },
    });
    const result = response.data.data || response.data;
    // Handle both paginated and direct array responses
    return Array.isArray(result) ? result : result.data || [];
  },

  // ============================================================================
  // Mutation Operations (Admin Only)
  // ============================================================================

  /**
   * Create a new product
   */
  create: async (data: CreateProductDTO): Promise<Product> => {
    const response = await api.post("/products", data);
    return response.data.data || response.data;
  },

  /**
   * Update an existing product
   */
  update: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data || response.data;
  },

  /**
   * Delete a product (soft delete)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  /**
   * Adjust product stock
   */
  adjustStock: async (
    id: string,
    data: StockAdjustmentDTO
  ): Promise<StockAdjustmentResponse> => {
    const response = await api.post(`/products/${id}/stock`, data);
    return response.data.data || response.data;
  },

  /**
   * Bulk update product status
   */
  bulkUpdateStatus: async (
    ids: string[],
    is_active: boolean
  ): Promise<{ updated: number }> => {
    const response = await api.patch("/products/bulk/status", {
      ids,
      is_active,
    });
    return response.data.data || response.data;
  },
};
