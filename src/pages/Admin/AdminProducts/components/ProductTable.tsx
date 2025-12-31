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
import { Pencil, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  onDelete: (productId: string) => void;
}

export default function ProductTable({ products, isLoading, onDelete }: ProductTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Brand</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Stock</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product: any) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      {product.featured && (
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
                  LKR {product.price?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {product.stock_quantity > 0 ? (
                    <span className="text-gray-600">{product.stock_quantity} items</span>
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
