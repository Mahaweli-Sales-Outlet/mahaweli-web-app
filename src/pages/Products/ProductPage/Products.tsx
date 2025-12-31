import {
  ProductsHeader,
  ProductsSidebar,
  SearchAndFilters,
  ResultsCount,
  ProductsGrid,
} from "./components";
import { useProducts, useProductFilters } from "./hooks";

export default function Products() {
  const { products, isLoading } = useProducts();
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showFilters,
    toggleFilters,
    filteredProducts,
    clearSearch,
    selectCategoryAndCloseFilters,
  } = useProductFilters(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex gap-4 md:gap-8">
          <ProductsSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex-1">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={clearSearch}
              showFilters={showFilters}
              onToggleFilters={toggleFilters}
              selectedCategory={selectedCategory}
              onCategoryChange={selectCategoryAndCloseFilters}
            />

            <ResultsCount
              count={filteredProducts.length}
              category={selectedCategory}
            />

            <ProductsGrid
              products={filteredProducts}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
