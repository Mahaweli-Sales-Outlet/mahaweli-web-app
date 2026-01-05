// Export all API modules
export { api, orderApi } from "./client";
export { authApi } from "./auth";
export { categoryApi } from "./categories";
export { productApi } from "./products";
export { uploadApi } from "./upload";
export type { LoginRequest, RegisterRequest, AuthResponse, ErrorResponse } from "./auth";
export type { Category, CategoryWithChildren, CategoryWithChildrenResponse, CreateCategoryDTO, UpdateCategoryDTO } from "@/types/category.types";
export type {
  Product,
  ProductFilters,
  PaginatedResult,
  CreateProductDTO,
  UpdateProductDTO,
  StockAdjustmentDTO,
  LowStockProductResponse,
} from "@/types/product.types";
