import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  OrderStats,
  OrderFilters,
  OrderTable,
  OrderDetailsDialog,
} from "./AdminOrders/components";
import {
  useOrdersData,
  useUpdateOrderStatus,
  useOrderFilters,
  useOrderStats,
} from "./AdminOrders/hooks";

export default function AdminOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { orders, isLoading } = useOrdersData();
  const filteredOrders = useOrderFilters(
    orders,
    searchQuery,
    statusFilter,
    paymentFilter
  );
  const stats = useOrderStats(orders);
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>

        <OrderStats stats={stats} />

        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentChange={setPaymentFilter}
          filteredCount={filteredOrders.length}
          totalCount={orders.length}
        />

        <OrderTable
          orders={filteredOrders}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          onViewDetails={setSelectedOrder}
        />
      </div>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
