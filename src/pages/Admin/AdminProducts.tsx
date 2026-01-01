import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import {
  ProductStats,
  ProductFilters,
  ProductTable,
  DeleteProductDialog,
  BulkActions,
  StockAdjustmentDialog,
  ExportButton,
  LowStockAlert,
} from "./AdminProducts/components";
import {
  useProductsData,
  useProductCategories,
  useDeleteProduct,
  useProductFilters,
  useStockAdjustment,
  useBulkOperations,
} from "./AdminProducts/hooks";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [stockAdjustProduct, setStockAdjustProduct] = useState<any>(null);

  const { products, isLoading } = useProductsData();
  const categories = useProductCategories(products);
  const filteredProducts = useProductFilters(
    products,
    searchQuery,
    categoryFilter,
    stockFilter
  );
  const deleteMutation = useDeleteProduct();
  const stockAdjustMutation = useStockAdjustment();
  const bulkOperations = useBulkOperations();

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} products?`)) {
      bulkOperations.deleteBulk.mutate(selectedIds, {
        onSuccess: () => setSelectedIds([]),
      });
    }
  };

  const handleBulkActivate = () => {
    bulkOperations.updateBulk.mutate(
      { productIds: selectedIds, updates: { is_active: true } },
      { onSuccess: () => setSelectedIds([]) }
    );
  };

  const handleBulkDeactivate = () => {
    bulkOperations.updateBulk.mutate(
      { productIds: selectedIds, updates: { is_active: false } },
      { onSuccess: () => setSelectedIds([]) }
    );
  };

  const handleStockAdjust = (adjustment: any) => {
    if (stockAdjustProduct) {
      stockAdjustMutation.mutate(
        { productId: stockAdjustProduct.id, data: adjustment },
        {
          onSuccess: () => setStockAdjustProduct(null),
        }
      );
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("AdminDashboard"))}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Product Management
            </h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <div className="flex gap-3">
            <ExportButton products={filteredProducts} />
            <Button
              onClick={() => navigate(createPageUrl("AdminProductForm"))}
              className="bg-green-500 hover:bg-green-600 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </Button>
          </div>
        </div>

        <ProductStats products={products} />

        <LowStockAlert products={products} />

        <BulkActions
          selectedIds={selectedIds}
          onDelete={handleBulkDelete}
          onActivate={handleBulkActivate}
          onDeactivate={handleBulkDeactivate}
          onClearSelection={() => setSelectedIds([])}
        />

        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stockFilter={stockFilter}
          onStockChange={setStockFilter}
          categories={categories}
          productCount={filteredProducts.length}
          totalCount={products.length}
        />

        <ProductTable
          products={filteredProducts}
          isLoading={isLoading}
          onDelete={setDeleteProductId}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onStockAdjust={(productId) => {
            const product = products.find((p) => p.id === productId);
            if (product) setStockAdjustProduct(product);
          }}
        />
      </div>

      <DeleteProductDialog
        isOpen={!!deleteProductId}
        onConfirm={() =>
          deleteProductId &&
          deleteMutation.mutate(deleteProductId, {
            onSuccess: () => setDeleteProductId(null),
          })
        }
        onCancel={() => setDeleteProductId(null)}
        isLoading={deleteMutation.isPending}
      />

      <StockAdjustmentDialog
        isOpen={!!stockAdjustProduct}
        product={stockAdjustProduct}
        onClose={() => setStockAdjustProduct(null)}
        onAdjust={handleStockAdjust}
        isLoading={stockAdjustMutation.isPending}
      />
    </div>
  );
}
