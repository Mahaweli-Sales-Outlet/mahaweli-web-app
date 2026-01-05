/**
 * Product Type Definitions
 * Sync with Backend: Backend/src/types/product.types.ts
 */

// ============================================================================
// Core Product Types
// ============================================================================

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  description: string | null;
  barcode: string | null;
  category_id: string | null;
  category_name?: string;
  category_slug?: string;
  price: number;
  cost_price: number | null;
  stock_quantity: number;
  min_stock_level: number;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  store_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category_name: string;
  category_slug: string;
}

// ============================================================================
// DTOs (Data Transfer Objects)
// ============================================================================

export interface CreateProductDTO {
  name: string;
  brand?: string;
  description?: string;
  barcode?: string;
  category_id?: string;
  price: number;
  cost_price?: number;
  stock_quantity?: number;
  min_stock_level?: number;
  image_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
  store_id?: string;
}

export interface UpdateProductDTO {
  name?: string;
  brand?: string;
  description?: string;
  barcode?: string;
  category_id?: string;
  price?: number;
  cost_price?: number;
  stock_quantity?: number;
  min_stock_level?: number;
  image_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

export interface StockAdjustmentDTO {
  quantity: number;
  transaction_type: InventoryTransactionType;
  reason?: string;
  reference_id?: string;
}

// ============================================================================
// Filters & Pagination
// ============================================================================

export interface ProductFilters {
  category_id?: string;
  is_active?: boolean;
  is_featured?: boolean;
  store_id?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: "name" | "price" | "created_at" | "stock_quantity";
  sort_order?: "asc" | "desc";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}

// ============================================================================
// Response Types
// ============================================================================

export interface ProductResponse extends Product {}

export interface LowStockProductResponse extends ProductResponse {
  stock_deficit: number;
}

export interface StockAdjustmentResponse {
  product_id: string;
  product_name: string;
  previous_quantity: number;
  new_quantity: number;
  quantity_change: number;
  transaction_type: InventoryTransactionType;
  message: string;
}

// ============================================================================
// Inventory Types
// ============================================================================

export type InventoryTransactionType =
  | "purchase"
  | "sale"
  | "adjustment"
  | "return"
  | "damage"
  | "transfer";

export interface InventoryLog {
  id: string;
  product_id: string;
  transaction_type: InventoryTransactionType;
  quantity_change: number;
  quantity_before: number;
  quantity_after: number;
  cost_at_transaction: number | null;
  reason: string | null;
  reference_id: string | null;
  performed_by: string | null;
  store_id: string | null;
  created_at: string;
}

// ============================================================================
// Legacy Compatibility (for existing components)
// ============================================================================

/**
 * @deprecated Use Product interface instead
 */
export interface LegacyProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  image_url?: string;
  stock: number;
  in_stock?: boolean;
  featured?: boolean;
  brand?: string;
}

/**
 * Convert new Product to legacy format for backwards compatibility
 */
export function toLegacyProduct(product: Product): LegacyProduct {
  return {
    id: parseInt(product.id) || 0,
    name: product.name,
    description: product.description || "",
    price: product.price,
    category: product.category_name || product.category_id || "",
    imageUrl: product.image_url || undefined,
    image_url: product.image_url || undefined,
    stock: product.stock_quantity,
    in_stock: product.stock_quantity > 0,
    featured: product.is_featured,
    brand: product.brand || undefined,
  };
}

/**
 * Convert legacy Product to new format
 */
export function fromLegacyProduct(legacy: LegacyProduct): Partial<Product> {
  return {
    id: String(legacy.id),
    name: legacy.name,
    description: legacy.description,
    price: legacy.price,
    image_url: legacy.imageUrl || legacy.image_url || null,
    stock_quantity: legacy.stock,
    is_featured: legacy.featured || false,
    brand: legacy.brand || null,
  };
}
