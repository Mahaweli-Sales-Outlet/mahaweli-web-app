import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Pencil, Trash2, Package, ArrowUpDown } from "lucide-react";

interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  onDelete: (productId: string) => void;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onStockAdjust?: (productId: string) => void;
}

type SortField = "name" | "price" | "stock_quantity" | "category";
type SortOrder = "asc" | "desc";

export default function ProductTable({ 
  products, 
  isLoading, 
  onDelete,
  selectedIds = [],
  onSelectionChange,
  onStockAdjust,
}: ProductTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string") {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === "asc" 
      ? (aValue || 0) - (bValue || 0) 
      : (bValue || 0) - (aValue || 0);
  });

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle selection
  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < products.length;

  const handleSelectAll = () => {
    if (onSelectionChange) {
      if (isAllSelected) {
        onSelectionChange([]);
      } else {
        onSelectionChange(products.map((p) => p.id));
      }
    }
  };

  const handleSelectProduct = (productId: string) => {
    if (onSelectionChange) {
      if (selectedIds.includes(productId)) {
        onSelectionChange(selectedIds.filter((id) => id !== productId));
      } else {
        onSelectionChange([...selectedIds, productId]);
      }
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead className="font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort(field)}>
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className="w-3 h-3" />
      </div>
    </TableHead>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {onSelectionChange && (
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={isSomeSelected ? "data-[state=checked]:bg-gray-500" : ""}
                />
              </TableHead>
            )}
            <SortableHeader field="name">Product</SortableHeader>
            <TableHead className="font-semibold">Brand</TableHead>
            <SortableHeader field="category">Category</SortableHeader>
            <SortableHeader field="price">Price</SortableHeader>
            <SortableHeader field="stock_quantity">Stock</SortableHeader>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={onSelectionChange ? 8 : 7} className="text-center py-12">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : sortedProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={onSelectionChange ? 8 : 7} className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </TableCell>
            </TableRow>
          ) : (
            sortedProducts.map((product: any) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                {onSelectionChange && (
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      {product.is_featured && (
                        <Badge className="mt-1 bg-purple-100 text-purple-700 border-0 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {product.brand ? <span className="text-gray-700">{product.brand}</span> : <span className="text-gray-400">—</span>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-gray-300">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-gray-900">
                  {(() => {
                    const priceValue =
                      typeof product.price === "number"
                        ? product.price
                        : parseFloat(product.price || "0");
                    const displayPrice = Number.isFinite(priceValue)
                      ? priceValue.toFixed(2)
                      : "0.00";
                    return <>LKR {displayPrice}</>;
                  })()}
                </TableCell>
                <TableCell>
                  {product.stock_quantity > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{product.stock_quantity} items</span>
                      {product.stock_quantity < 10 && (
                        <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">
                          Low
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {product.in_stock ? (
                    <Badge className="bg-green-100 text-green-700 border-0">In Stock</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-0">Out of Stock</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onStockAdjust && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onStockAdjust(product.id)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                        title="Adjust Stock"
                      >
                        <Package className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`${createPageUrl("AdminProductForm")}?id=${product.id}`)}
                      className="hover:bg-green-50 hover:text-green-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
