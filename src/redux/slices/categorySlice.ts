/**
 * Category Redux Slice
 * Manages category state with async thunks for API calls
 */

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { categoryApi } from "@/api/categories";
import type { Category, CategoryWithChildrenResponse, CreateCategoryDTO, UpdateCategoryDTO } from "@/types/category.types";

export interface CategoryState {
  categories: CategoryWithChildrenResponse[];
  topLevelCategories: Category[];
  selectedCategory: Category | null;
  categoryChildren: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  topLevelCategories: [],
  selectedCategory: null,
  categoryChildren: [],
  loading: false,
  error: null,
};

/**
 * Fetch all categories with hierarchy
 */
export const fetchCategoriesThunk = createAsyncThunk(
  "category/fetchCategories",
  async (includeInactive: boolean = false, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.getAllCategories(includeInactive);
      return categories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch categories"
      );
    }
  }
);

/**
 * Fetch top-level categories
 */
export const fetchTopLevelCategoriesThunk = createAsyncThunk(
  "category/fetchTopLevel",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.getTopLevelCategories();
      return categories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch top-level categories"
      );
    }
  }
);

/**
 * Fetch single category by ID
 */
export const fetchCategoryByIdThunk = createAsyncThunk(
  "category/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const category = await categoryApi.getCategoryById(id);
      return category;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch category"
      );
    }
  }
);

/**
 * Fetch children of a category
 */
export const fetchCategoryChildrenThunk = createAsyncThunk(
  "category/fetchChildren",
  async (parentId: string, { rejectWithValue }) => {
    try {
      const children = await categoryApi.getCategoryChildren(parentId);
      return children;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch category children"
      );
    }
  }
);

/**
 * Create a new category (Admin only)
 */
export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (data: CreateCategoryDTO, { rejectWithValue }) => {
    try {
      const category = await categoryApi.createCategory(data);
      return category;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to create category"
      );
    }
  }
);

/**
 * Update a category (Admin only)
 */
export const updateCategoryThunk = createAsyncThunk(
  "category/update",
  async ({ id, data }: { id: string; data: UpdateCategoryDTO }, { rejectWithValue }) => {
    try {
      const category = await categoryApi.updateCategory(id, data);
      return category;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to update category"
      );
    }
  }
);

/**
 * Delete a category (Admin only)
 */
export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await categoryApi.deleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to delete category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    selectCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Categories
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Top Level Categories
    builder
      .addCase(fetchTopLevelCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopLevelCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.topLevelCategories = action.payload;
      })
      .addCase(fetchTopLevelCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Category by ID
    builder
      .addCase(fetchCategoryByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Category Children
    builder
      .addCase(fetchCategoryChildrenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryChildrenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryChildren = action.payload;
      })
      .addCase(fetchCategoryChildrenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Category
    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state) => {
        state.loading = false;
        // Add new category to the list (basic approach, full refetch recommended)
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Category
    builder
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedCategory?.id === action.payload.id) {
          state.selectedCategory = action.payload;
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Category
    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, selectCategory, clearSelectedCategory } =
  categorySlice.actions;

// Selectors
export const selectAllCategories = (state: { category: CategoryState }) =>
  state.category.categories;
export const selectTopLevelCategories = (state: { category: CategoryState }) =>
  state.category.topLevelCategories;
export const selectSelectedCategory = (state: { category: CategoryState }) =>
  state.category.selectedCategory;
export const selectCategoryChildren = (state: { category: CategoryState }) =>
  state.category.categoryChildren;
export const selectCategoryLoading = (state: { category: CategoryState }) =>
  state.category.loading;
export const selectCategoryError = (state: { category: CategoryState }) =>
  state.category.error;

export default categorySlice.reducer;
