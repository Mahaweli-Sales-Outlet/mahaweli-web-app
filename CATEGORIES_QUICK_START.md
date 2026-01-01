# Categories - Quick Start Guide

## Navigation
Users can now access categories at `/categories` route.

## How It Works

### 1. **Redux State Management**
Categories are managed in Redux (`categorySlice.ts`):
- Stores hierarchical category data
- Manages loading states
- Handles errors
- Caches top-level categories

### 2. **Hooks for Easy Access**
Import and use in any component:

```tsx
// Get all categories
import { useCategories } from "@/hooks/useCategories";
const { categories, loading, error } = useCategories();

// Get only top-level categories
import { useTopLevelCategories } from "@/hooks/useCategories";
const { topLevelCategories, loading, error } = useTopLevelCategories();

// For admin: detailed category operations
import { useCategory } from "@/pages/Categories/hooks";
const { selectedCategory, children, fetchCategory, fetchChildren } = useCategory();
```

### 3. **Components**
Ready-to-use components in `src/components/categories/`:

```tsx
// Display categories
import { CategoryList } from "@/components/categories";
<CategoryList 
  categories={categories} 
  layout="grid"  // or "list"
  onSelectCategory={(category) => console.log(category)}
/>

// Show navigation breadcrumb
import { CategoryBreadcrumb } from "@/components/categories";
<CategoryBreadcrumb 
  categories={pathCategories}
  onSelectCategory={(id) => console.log(id)}
/>
```

## Integration Examples

### Example 1: Display Categories on Homepage
```tsx
import { useTopLevelCategories } from "@/hooks/useCategories";
import { CategoryList } from "@/components/categories";

export function HomeSection() {
  const { topLevelCategories, loading } = useTopLevelCategories();
  
  if (loading) return <Spinner />;
  
  return (
    <section>
      <h2>Shop by Category</h2>
      <CategoryList 
        categories={topLevelCategories} 
        layout="grid"
      />
    </section>
  );
}
```

### Example 2: Filter Products by Category
```tsx
import { useCategories } from "@/hooks/useCategories";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCategoryChildrenThunk } from "@/redux/slices/categorySlice";

export function ProductFilter() {
  const { categories } = useCategories();
  const dispatch = useAppDispatch();
  
  const handleCategorySelect = (categoryId: string) => {
    dispatch(fetchCategoryChildrenThunk(categoryId));
    // Then filter products...
  };
  
  return (
    <CategoryList 
      categories={categories}
      onSelectCategory={(cat) => handleCategorySelect(cat.id)}
    />
  );
}
```

### Example 3: Admin Category Management (Future)
```tsx
import { useAppDispatch } from "@/redux/hooks";
import { createCategoryThunk } from "@/redux/slices/categorySlice";

export function CreateCategoryForm() {
  const dispatch = useAppDispatch();
  
  const handleCreate = (data: CreateCategoryDTO) => {
    dispatch(createCategoryThunk(data));
    // Handle success/error...
  };
}
```

## API Reference

### Hooks
- `useCategories(includeInactive?)` - Get all categories
- `useTopLevelCategories()` - Get root categories only
- `useCategory()` - Single category operations (admin)

### Redux Thunks
```tsx
// Queries
dispatch(fetchCategoriesThunk(includeInactive));
dispatch(fetchTopLevelCategoriesThunk());
dispatch(fetchCategoryByIdThunk(id));
dispatch(fetchCategoryChildrenThunk(parentId));

// Mutations (Admin only)
dispatch(createCategoryThunk(data));
dispatch(updateCategoryThunk({ id, data }));
dispatch(deleteCategoryThunk(id));
```

### Redux Selectors
```tsx
import { 
  selectAllCategories,
  selectTopLevelCategories,
  selectSelectedCategory,
  selectCategoryChildren,
  selectCategoryLoading,
  selectCategoryError
} from "@/redux/slices/categorySlice";

const categories = useAppSelector(selectAllCategories);
const topLevel = useAppSelector(selectTopLevelCategories);
const selected = useAppSelector(selectSelectedCategory);
const children = useAppSelector(selectCategoryChildren);
const loading = useAppSelector(selectCategoryLoading);
const error = useAppSelector(selectCategoryError);
```

## Customization

### Colors
Edit `src/pages/Categories/constants.ts`:
```tsx
export const CATEGORY_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  // Add more hex colors...
];
```

### Layout
Pass layout prop to CategoryList:
```tsx
<CategoryList categories={categories} layout="grid" />  // Grid view
<CategoryList categories={categories} layout="list" />   // List view
```

### Styling
CategoryList uses Tailwind classes. Modify in `src/components/categories/CategoryList.tsx`:
- `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4` - Grid columns
- `rounded-lg p-4` - Card styling
- `text-sm md:text-base` - Typography

## Testing

### Manual Testing Checklist
- [ ] Navigate to `/categories` - Should see categories page
- [ ] Grid/List toggle works
- [ ] Categories display with icons and colors (if set)
- [ ] Subcategory counts show correctly
- [ ] Loading spinner appears on initial load
- [ ] No TypeScript errors in console

### Debugging
Enable Redux DevTools:
```tsx
// Check category state
import { useAppSelector } from "@/redux/hooks";
import { selectAllCategories } from "@/redux/slices/categorySlice";

const categories = useAppSelector(selectAllCategories);
console.log("Categories:", categories);
```

## Performance Notes

✅ **Optimized**
- Categories fetched once and cached in Redux
- Selectors prevent unnecessary re-renders
- Top-level categories cached separately for quick access

🚀 **Future Improvements**
- Add React Query for advanced caching
- Implement pagination for large category lists
- Add category search/filter
- Lazy load category images
- Add category favorites/bookmarks

## File Structure
```
src/
├── api/
│   └── categories.ts              # API methods
├── components/
│   └── categories/
│       ├── CategoryList.tsx
│       ├── CategoryBreadcrumb.tsx
│       └── index.ts
├── hooks/
│   └── useCategories.ts           # Custom hooks
├── pages/
│   └── Categories/
│       ├── Categories.tsx          # Main page
│       ├── constants.ts
│       ├── types.ts
│       └── hooks/
│           ├── useCategory.ts
│           └── index.ts
├── redux/
│   └── slices/
│       └── categorySlice.ts        # Redux state
└── types/
    └── category.types.ts          # Type definitions
```

## Common Issues

### Categories not loading?
- Check network tab in DevTools - API call should return data
- Verify backend categories route is working
- Check Redux state with Redux DevTools

### Colors not showing?
- Ensure `color_code` field is in hex format (#RRGGBB)
- Check that category data from backend includes color_code

### Layout toggle not working?
- Verify `layout` state is being updated in Categories.tsx
- Check that CategoryList receives `layout` prop correctly

## Support
For issues or questions, check:
1. CATEGORIES_IMPLEMENTATION.md - Full documentation
2. ARCHITECTURE.md - Design patterns
3. Redux slices - State management patterns
4. Component files - Implementation details

---
**Last Updated**: 01/01/2026
**Status**: Ready for Production
