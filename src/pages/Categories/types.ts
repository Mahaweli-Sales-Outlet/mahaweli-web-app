/**
 * Categories Page Types
 */

import type { CategoryWithChildrenResponse } from "@/types/category.types";

export interface CategoryPageState {
  selectedLayout: "grid" | "list";
  selectedCategoryId?: string;
}

export type CategoriesPageProps = Record<string, never>;
