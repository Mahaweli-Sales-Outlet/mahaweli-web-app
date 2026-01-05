import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

interface LowStockAlertProps {
  products: any[];
}

export default function LowStockAlert({ products }: LowStockAlertProps) {
  const navigate = useNavigate();
  
  const lowStockProducts = products.filter(
    (p) => p.stock_quantity > 0 && p.stock_quantity < 10
  );

  if (lowStockProducts.length === 0) return null;

  return (
    <Card className="border-yellow-200 bg-yellow-50 p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900 mb-1">
            Low Stock Alert
          </h3>
          <p className="text-sm text-yellow-800 mb-3">
            {lowStockProducts.length} product{lowStockProducts.length > 1 ? "s" : ""} running low on stock
          </p>
          <div className="space-y-2">
            {lowStockProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`${createPageUrl("AdminProductForm")}?id=${product.id}`)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700 border-0">
                  {product.stock_quantity} left
                </Badge>
              </div>
            ))}
            {lowStockProducts.length > 3 && (
              <p className="text-xs text-yellow-700 text-center pt-1">
                +{lowStockProducts.length - 3} more products
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
