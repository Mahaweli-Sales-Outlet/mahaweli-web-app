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
} from "./AdminProducts/components";
import {
  useProductsData,
  useProductCategories,
  useDeleteProduct,
  useProductFilters,
} from "./AdminProducts/hooks";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const { products, isLoading } = useProductsData();
  const categories = useProductCategories(products);
  const filteredProducts = useProductFilters(
    products,
    searchQuery,
    categoryFilter,
    stockFilter
  );
  const deleteMutation = useDeleteProduct();

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
          <Button
            onClick={() => navigate(createPageUrl("AdminProductForm"))}
            className="bg-green-500 hover:bg-green-600 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </div>

        <ProductStats products={products} />

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
        />
      </div>

      <DeleteProductDialog
        isOpen={!!deleteProductId}
        onConfirm={() => deleteProductId && deleteMutation.mutate(deleteProductId)}
        onCancel={() => setDeleteProductId(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
