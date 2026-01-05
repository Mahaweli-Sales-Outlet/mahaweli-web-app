# Clean Code Architecture - Page Refactoring Pattern

## Folder Structure

Each page follows this structure:
```
src/pages/PageName/
├── PageName.tsx          # Main component (25-50 lines, composition only)
├── constants.ts          # Data, labels, images, regexes
├── types.ts             # TypeScript interfaces (if needed)
├── components/
│   ├── Component1.tsx
│   ├── Component2.tsx
│   └── index.ts         # Barrel export
├── hooks/
│   ├── useCustomHook.ts
│   └── index.ts         # Barrel export
```

## Redux State Management

### Store Structure
```
src/redux/
├── store.ts              # Configure store with all reducers
├── hooks.ts              # Typed useAppDispatch, useAppSelector
└── slices/
    ├── authSlice.ts      # Authentication state
    ├── cartSlice.ts      # Shopping cart state
    ├── categorySlice.ts  # Category state & hierarchy
    ├── productSlice.ts   # Product state, filters, pagination
    └── [feature]Slice.ts # Other feature states
```

## Key Principles

### 1. Main Component (PageName.tsx)
- **Size**: 25-55 lines maximum
- **Purpose**: Composition and layout only
- **Pattern**: Import components & hooks, manage state at this level, render
- **Example**:
```tsx
export default function HomePage() {
  const { data } = useCustomHook();
  return (
    <div>
      <Component1 prop={data} />
      <Component2 />
    </div>
  );
}
```

### 2. Constants (constants.ts)
- All hardcoded data: arrays, objects, strings, regexes
- Images/URLs
- Form labels and validation patterns
- Export as named exports
- Examples: `values`, `partners`, `milestones`, `faqs`, `PASSWORD_REGEX`

### 3. Types (types.ts) - Optional
- TypeScript interfaces and types for the page
- Use `export interface` pattern
- Examples: `FormData`, `PasswordStrength`, `UserProfile`
- **Critical**: Use `type-only imports` in hooks/components
  ```tsx
  import type { FormData } from "../types";
  ```

### 4. Components (components/ folder)
- One component per file
- Small, focused, reusable
- Accept props for data and callbacks
- No business logic
- **Imports**:
  - Shared UI: `import { Button } from "@/components/ui/button"`
  - Shared auth: `import { FormField } from "@/components/auth"`
  - Constants: `import { labels } from "../constants"`
  - Types: `import type { Props } from "../types"`
- Create `index.ts` barrel export:
  ```tsx
  export { default as Component1 } from "./Component1";
  export { default as Component2 } from "./Component2";
  ```

### 5. Hooks (hooks/ folder)
- Custom hooks for business logic
- Redux state management hooks
- Form validation logic
- API calls
- File per hook with focused responsibility
- Example hooks:
  - `useCart()` - Cart item logic with Redux
  - `useFormValidation()` - Validation rules
  - `useLogin()` - Redux auth dispatch for login
  - `useRegisterSubmit()` - Redux auth dispatch for registration
  - `usePasswordStrength()` - Password checks
- Create `index.ts` barrel export

## Redux Integration Patterns

### Authentication State
```tsx
// In hooks/useLogin.ts
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginThunk, selectAuthError } from "@/redux/slices/authSlice";

export function useLogin() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const [loading, setLoading] = useState(false); // Component-level loading
  
  const login = async (credentials) => {
    setLoading(true);
    const result = await dispatch(loginThunk(credentials));
    if (loginThunk.fulfilled.match(result)) {
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  };
  
  return { error, loading, login };
}
```

### Token Management Strategy
- **Tokens**: Store in localStorage (security best practice)
- **User Data**: Store in Redux state
- **On App Load**: Read tokens from localStorage → populate Redux
- **On Logout**: Clear both localStorage and Redux
- **No redux-persist** for tokens (security risk)

### Loading States
- **Button Spinners**: Component-level `useState(loading)` for user actions
  - Example: "Signing in...", "Creating Account...", "Saving..."
- **Global Loading**: Redux state for app-wide loading (if needed)
- **Pattern**: Keep button interactions responsive with local state

### Error Handling
- **Store in Redux**: Errors persist across route changes
- **Auto-clear**: Clear errors on navigation (via Layout useEffect)
- **Display**: Read from Redux selectors in components
- **Toast Notifications**: Trigger in component layer, not Redux thunks

### API Client with Store Injector
```tsx
// api/setupInterceptors.ts
let store: Store | null = null;

export function injectStore(_store: Store) {
  store = _store;
}

export function getStore() {
  return store;
}

// main.tsx
import { injectStore } from "./api/setupInterceptors";
injectStore(store); // Call BEFORE rendering app

// api/client.ts - Can now dispatch Redux actions
if (error.response?.status === 401) {
  const store = getStore();
  if (store) {
    await store.dispatch(logoutThunk());
  }
}
```

### Token Refresh Pattern
```tsx
// On 401 error in interceptor:
// 1. Check if request already retried (_retry flag)
// 2. If not, attempt refreshTokenThunk()
// 3. If success, retry original request with new token
// 4. If fail, dispatch logoutThunk()
// 5. Prevents infinite retry loops
```

## Import Patterns

**Main Component**:
```tsx
import { Component1, Component2 } from "./components";
import { useCustomHook } from "./hooks";
import { labels, data } from "./constants";
```

**Components**:
```tsx
import type { Props } from "../types";
import { labels } from "../constants";
import { Button } from "@/components/ui/button";
```

**Hooks with Redux**:
```tsx
import type { FormData } from "../types";
import { REGEX_PATTERN } from "../constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { someThunk, selectSomeData } from "@/redux/slices/someSlice";
```

**API Module**:
```tsx
import { authApi, productApi } from "@/api";
```

## Shared Components

**Already Consolidated**:
- `src/components/ui/` - Base UI (Button, Input, Card, etc.)
- `src/components/auth/` - Auth-specific (FormField, ErrorAlert, PasswordStrengthIndicator)
- `src/components/profile/` - Profile components
- `src/components/layout/` - Navigation & Footer
- `src/components/ProductCard.tsx` - Product display

**Don't recreate** - use these in page components.

## Code Patterns

### Redux Slice Pattern
```tsx
// slices/featureSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { someApi } from "@/api";

// Async thunk for API calls
export const fetchDataThunk = createAsyncThunk(
  "feature/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await someApi.getData(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

const featureSlice = createSlice({
  name: "feature",
  initialState: { data: null, loading: false, error: null },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = featureSlice.actions;
export const selectData = (state) => state.feature.data;
export const selectError = (state) => state.feature.error;
export default featureSlice.reducer;
```

### Form Handling
1. Create `useFormState()` hook for local state (inputs, validation)
2. Create `useFormSubmit()` hook that dispatches Redux thunks
3. Use component-level `useState(loading)` for button spinners
4. Read errors from Redux selectors
5. Create UI components for inputs (use shared `FormField`)
6. Main component orchestrates

### Section Components (Homepage pattern)
- Each section is a separate component
- Main page imports all sections
- Sections handle their own layout and logic
- Data in constants.ts

### Validation & Error Handling
- Use separate hooks for validation logic
- **API Errors**: Store in Redux state
- **Validation Errors**: Keep in component state or validation hook
- **Auto-clear**: Dispatch `clearError()` on route changes (in Layout)
- Display errors via UI components or toast notifications

### Protected Routes with Redux
```tsx
// components/ProtectedRoute.tsx
import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated, selectUserRole } from "@/redux/slices/authSlice";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

## TypeScript Standards

**Type-only Imports** (when `verbatimModuleSyntax` enabled):
```tsx
import type { MyInterface } from "../types";
import { VALUE } from "../constants"; // Not a type
```

## File Size Guidelines

- Main component: 25-55 lines
- Section components: 30-80 lines
- Hooks: 15-50 lines
- UI components: 20-60 lines
- Constants: Unlimited
- Types: Unlimited

## Refactoring Checklist

- [ ] Extract all hardcoded data to constants.ts
- [ ] Identify data types, create types.ts
- [ ] Extract UI sections to components/
- [ ] Move business logic to hooks/
- [ ] Create barrel exports (index.ts)
- [ ] Simplify main component to composition
- [ ] Fix TypeScript errors (type-only imports)
- [ ] Verify no console errors
- [ ] Test all functionality

## Examples

**Good Main Component**:
```tsx
// HomePage.tsx (~20 lines)
import { HeroSection, FeaturedSection } from "./components";
import { useFeatured } from "./hooks";

export default function HomePage() {
  const { products } = useFeatured();
  return (
    <div>
      <HeroSection />
      <FeaturedSection products={products} />
    </div>
  );
}
```

**Good Component**:
```tsx
// CartItem.tsx (~40 lines)
import { Trash2 } from "lucide-react";
import type { CartItemProps } from "../types";

export default function CartItem({ 
  product, 
  onRemove, 
  onUpdateQty 
}: CartItemProps) {
  return (
    <div className="...">
      <img src={product.image} />
      <div>
        <h3>{product.name}</h3>
        <p>₨{product.price}</p>
      </div>
      <button onClick={() => onRemove(product.id)}>
        <Trash2 />
      </button>
    </div>
  );
}
```

**Good Hook**:
```tsx
// useCart.ts (~30 lines)
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  
  const remove = (id: number) => dispatch(removeFromCart(id));
  const updateQty = (id: number, qty: number) => 
    dispatch(updateQuantity({ id, qty }));
  
  return { items, remove, updateQty };
}
```

**Good Redux Integration Hook**:
```tsx
// useLogin.ts (~35 lines)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginThunk, selectAuthError } from "@/redux/slices/authSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await dispatch(loginThunk(credentials));
      if (loginThunk.fulfilled.match(result)) {
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  
  return { error, loading, login };
}
```

## Best Practices Summary

### State Management
- ✅ Use Redux for: User auth, global app state, data that persists across routes
- ✅ Use local useState for: Form inputs, UI toggles, button loading states
- ✅ Use React Query for: Server state, caching, background refetching

### Security
- ✅ Store tokens in localStorage only (not Redux)
- ✅ Read tokens on app mount and populate Redux user state
- ✅ Implement token refresh with retry limits (_retry flag)
- ✅ Clear all auth data on logout (localStorage + Redux)

### Error Handling
- ✅ Store API errors in Redux for persistence
- ✅ Auto-clear errors on route changes
- ✅ Show validation errors immediately (component state)
- ✅ Use toast notifications for success/error feedback (component layer)

### Performance
- ✅ Use Redux selectors to prevent unnecessary re-renders
- ✅ Keep component-level state for fast user interactions
- ✅ Use memoization (useMemo, React.memo) for expensive computations
- ✅ Lazy load routes and heavy components

### Code Organization
- ✅ One concern per file (hooks, components, types)
- ✅ Barrel exports (index.ts) for clean imports
- ✅ Type-only imports when using types
- ✅ Consistent naming: useFeature, FeatureSection, FEATURE_CONSTANT

---
**Last Updated**: 01/01/2026  
**Reference Pages**: HomePage, Products, Login, Register, Contact, Cart, About, Profile, Categories  
**Redux Slices**: authSlice, cartSlice, categorySlice, productSlice  
**Key Patterns**: Store Injector, Token Refresh, Auto Error Clearing, Category Hierarchy, Product Filters

## Category Integration

### Category State Structure
```tsx
// Redux Slice: categorySlice.ts
interface CategoryState {
  categories: CategoryWithChildrenResponse[];  // Hierarchical categories
  topLevelCategories: Category[];               // Root categories only
  selectedCategory: Category | null;            // Current selected category
  categoryChildren: Category[];                 // Direct children
  loading: boolean;
  error: string | null;
}
```

### Category API Endpoints
- `GET /api/categories` - All categories with hierarchy
- `GET /api/categories/top-level` - Root categories only
- `GET /api/categories/:id` - Single category
- `GET /api/categories/:id/children` - Direct children
- `POST /api/categories` - Create (admin only)
- `PUT /api/categories/:id` - Update (admin only)
- `DELETE /api/categories/:id` - Delete (admin only)

### Usage Example
```tsx
// In Components or Pages
import { useCategories, useTopLevelCategories } from "@/hooks/useCategories";
import { CategoryList, CategoryBreadcrumb } from "@/components/categories";

export function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  
  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorAlert message={error} />}
      {categories && <CategoryList categories={categories} layout="grid" />}
    </div>
  );
}
```

### Category Components
- `CategoryList` - Display categories in grid/list layout
- `CategoryBreadcrumb` - Show category navigation path
- Location: `src/components/categories/`

### Async Thunks
- `fetchCategoriesThunk(includeInactive?)` - All categories
- `fetchTopLevelCategoriesThunk()` - Root only
- `fetchCategoryByIdThunk(id)` - Single category
- `fetchCategoryChildrenThunk(parentId)` - Children
- `createCategoryThunk(data)` - Admin create
- `updateCategoryThunk({id, data})` - Admin update
- `deleteCategoryThunk(id)` - Admin delete
