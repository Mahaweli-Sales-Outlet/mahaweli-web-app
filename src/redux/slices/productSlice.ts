/**
 * Product Redux Slice
 * Manages product state with async thunks for API calls
 */

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { productApi } from "@/api/products";
import type {
  Product,
  ProductFilters,
  Pagination,
  CreateProductDTO,
  UpdateProductDTO,
  StockAdjustmentDTO,
  LowStockProductResponse,
} from "@/types/product.types";

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  lowStockProducts: LowStockProductResponse[];
  selectedProduct: Product | null;
  categoryProducts: Product[];
  searchResults: Product[];
  pagination: Pagination | null;
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  lowStockProducts: [],
  selectedProduct: null,
  categoryProducts: [],
  searchResults: [],
  pagination: null,
  filters: {},
  loading: false,
  error: null,
};

// ============================================================================
// Query Thunks
// ============================================================================

/**
 * Fetch all products with filters and pagination
 */
export const fetchProductsThunk = createAsyncThunk(
  "product/fetchProducts",
  async (filters: ProductFilters = {}, { rejectWithValue }) => {
    try {
      const result = await productApi.getAll(filters);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch products"
      );
    }
  }
);

/**
 * Fetch a single product by ID
 */
export const fetchProductByIdThunk = createAsyncThunk(
  "product/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const product = await productApi.getById(id);
      return product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch product"
      );
    }
  }
);

/**
 * Fetch product by barcode (for POS)
 */
export const fetchProductByBarcodeThunk = createAsyncThunk(
  "product/fetchByBarcode",
  async (barcode: string, { rejectWithValue }) => {
    try {
      const product = await productApi.getByBarcode(barcode);
      return product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Product not found"
      );
    }
  }
);

/**
 * Search products
 */
export const searchProductsThunk = createAsyncThunk(
  "product/search",
  async (
    { query, limit }: { query: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const products = await productApi.search(query, limit);
      return products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Search failed"
      );
    }
  }
);

/**
 * Fetch featured products
 */
export const fetchFeaturedProductsThunk = createAsyncThunk(
  "product/fetchFeatured",
  async (limit: number = 8, { rejectWithValue }) => {
    try {
      const products = await productApi.getFeatured(limit);
      return products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch featured products"
      );
    }
  }
);

/**
 * Fetch low stock products
 */
export const fetchLowStockProductsThunk = createAsyncThunk(
  "product/fetchLowStock",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productApi.getLowStock();
      return products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch low stock products"
      );
    }
  }
);

/**
 * Fetch products by category
 */
export const fetchProductsByCategoryThunk = createAsyncThunk(
  "product/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const products = await productApi.getByCategory(categoryId);
      return products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch category products"
      );
    }
  }
);

// ============================================================================
// Mutation Thunks (Admin Only)
// ============================================================================

/**
 * Create a new product
 */
export const createProductThunk = createAsyncThunk(
  "product/create",
  async (data: CreateProductDTO, { rejectWithValue }) => {
    try {
      const product = await productApi.create(data);
      return product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to create product"
      );
    }
  }
);

/**
 * Update an existing product
 */
export const updateProductThunk = createAsyncThunk(
  "product/update",
  async (
    { id, data }: { id: string; data: UpdateProductDTO },
    { rejectWithValue }
  ) => {
    try {
      const product = await productApi.update(id, data);
      return product;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to update product"
      );
    }
  }
);

/**
 * Delete a product
 */
export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await productApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to delete product"
      );
    }
  }
);

/**
 * Adjust product stock
 */
export const adjustStockThunk = createAsyncThunk(
  "product/adjustStock",
  async (
    { id, data }: { id: string; data: StockAdjustmentDTO },
    { rejectWithValue }
  ) => {
    try {
      const result = await productApi.adjustStock(id, data);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to adjust stock"
      );
    }
  }
);

// ============================================================================
// Slice Definition
// ============================================================================

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch All Products
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Product by ID
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch by Barcode
    builder
      .addCase(fetchProductByBarcodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByBarcodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByBarcodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search Products
    builder
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Featured Products
    builder
      .addCase(fetchFeaturedProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Low Stock Products
    builder
      .addCase(fetchLowStockProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLowStockProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lowStockProducts = action.payload;
      })
      .addCase(fetchLowStockProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Products by Category
    builder
      .addCase(fetchProductsByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Product
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Product
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Product
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Adjust Stock
    builder
      .addCase(adjustStockThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adjustStockThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Update product in list with new stock
        const product = state.products.find(
          (p) => p.id === action.payload.product_id
        );
        if (product) {
          product.stock_quantity = action.payload.new_quantity;
        }
        if (state.selectedProduct?.id === action.payload.product_id) {
          state.selectedProduct.stock_quantity = action.payload.new_quantity;
        }
      })
      .addCase(adjustStockThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearFilters,
  selectProduct,
  clearSelectedProduct,
  clearSearchResults,
} = productSlice.actions;

// ============================================================================
// Selectors
// ============================================================================

export const selectProducts = (state: { product: ProductState }) =>
  state.product.products;
export const selectFeaturedProducts = (state: { product: ProductState }) =>
  state.product.featuredProducts;
export const selectLowStockProducts = (state: { product: ProductState }) =>
  state.product.lowStockProducts;
export const selectSelectedProduct = (state: { product: ProductState }) =>
  state.product.selectedProduct;
export const selectCategoryProducts = (state: { product: ProductState }) =>
  state.product.categoryProducts;
export const selectSearchResults = (state: { product: ProductState }) =>
  state.product.searchResults;
export const selectPagination = (state: { product: ProductState }) =>
  state.product.pagination;
export const selectProductFilters = (state: { product: ProductState }) =>
  state.product.filters;
export const selectProductLoading = (state: { product: ProductState }) =>
  state.product.loading;
export const selectProductError = (state: { product: ProductState }) =>
  state.product.error;

export default productSlice.reducer;
