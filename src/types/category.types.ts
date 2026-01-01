/**
 * Category Type Definitions
 * Sync with Backend: Backend/src/types/category.types.ts
 */

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  icon_url?: string;
  color_code?: string;
  parent_category_id?: string | null;
  display_order?: number;
  is_active: boolean;
  store_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

export interface CategoryResponse extends Category {}

export interface CategoryWithChildrenResponse extends Category {
  children?: CategoryWithChildrenResponse[];
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  description?: string;
  icon_url?: string;
  color_code?: string;
  parent_category_id?: string | null;
  display_order?: number;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  description?: string;
  icon_url?: string;
  color_code?: string;
  parent_category_id?: string | null;
  display_order?: number;
  is_active?: boolean;
}
