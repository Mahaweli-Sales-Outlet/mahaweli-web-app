import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { Product, StockAdjustmentDTO } from "@/types/product.types";
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
  
  // Dialog states
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [stockAdjustProduct, setStockAdjustProduct] = useState<Product | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Data and operations
  const { products, isLoading, error } = useProductsData();
  const categories = useProductCategories(products);
  const filteredProducts = useProductFilters(
    products,
    searchQuery,
    categoryFilter,
    stockFilter
  );
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct();
  const { adjustStock, loading: stockLoading } = useStockAdjustment();
  const { deleteBulk } = useBulkOperations();

  const handleDelete = useCallback(
    async (productId: string) => {
      try {
        const success = await deleteProduct(productId);
        if (success) {
          toast.success("Product deleted successfully");
          setDeleteProductId(null);
        } else {
          toast.error("Failed to delete product");
        }
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("An error occurred while deleting the product");
      }
    },
    [deleteProduct]
  );

  const handleBulkDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;

    if (!window.confirm(`Delete ${selectedIds.length} selected product(s)?`)) {
      return;
    }

    try {
      const success = await deleteBulk(selectedIds);
      if (success) {
        toast.success(`${selectedIds.length} product(s) deleted successfully`);
        setSelectedIds([]);
      } else {
        toast.error("Some products failed to delete");
      }
    } catch (err) {
      console.error("Bulk delete error:", err);
      toast.error("An error occurred during bulk deletion");
    }
  }, [selectedIds, deleteBulk]);

  const handleStockAdjust = useCallback(
    async (adjustment: StockAdjustmentDTO) => {
      if (!stockAdjustProduct) return;

      try {
        const success = await adjustStock(stockAdjustProduct.id, adjustment);
        if (success) {
          toast.success("Stock adjusted successfully");
          setStockAdjustProduct(null);
        } else {
          toast.error("Failed to adjust stock");
        }
      } catch (err) {
        console.error("Stock adjustment error:", err);
        toast.error("An error occurred while adjusting stock");
      }
    },
    [stockAdjustProduct, adjustStock]
  );

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Error Loading Products</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <ProductStats products={products} />

        <LowStockAlert products={products} />

        <BulkActions
          selectedIds={selectedIds}
          onDelete={handleBulkDelete}
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
        onConfirm={() => deleteProductId && handleDelete(deleteProductId)}
        onCancel={() => setDeleteProductId(null)}
        isLoading={deleteLoading}
      />

      <StockAdjustmentDialog
        isOpen={!!stockAdjustProduct}
        product={stockAdjustProduct}
        onClose={() => setStockAdjustProduct(null)}
        onAdjust={handleStockAdjust}
        isLoading={stockLoading}
      />
    </div>
  );
}
