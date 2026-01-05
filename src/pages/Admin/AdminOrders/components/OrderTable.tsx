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
import { Eye } from "lucide-react";
import { ORDER_STATUS_CONFIG, ORDER_STATUS_OPTIONS } from "../constants";

interface OrderTableProps {
  orders: any[];
  isLoading: boolean;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewDetails: (order: any) => void;
}

export default function OrderTable({
  orders,
  isLoading,
  onStatusChange,
  onViewDetails,
}: OrderTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Order #</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Items</TableHead>
            <TableHead className="font-semibold">Total</TableHead>
            <TableHead className="font-semibold">Payment</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order: any) => {
              const statusInfo =
                ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG] ||
                ORDER_STATUS_CONFIG.pending;

              return (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">
                    {order.order_number || order.id?.substring(0, 8)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.customer_email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">
                      {order.items?.length || 0} items
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    LKR {order.total?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-gray-300">
                      {order.payment_method?.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                      className={`w-full h-10 rounded-md border-0 px-3 py-2 text-sm font-medium ${statusInfo.color} focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    >
                      {ORDER_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(order)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
