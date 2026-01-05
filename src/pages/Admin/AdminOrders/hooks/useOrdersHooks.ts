import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/api";

export const useOrdersData = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => productApi.getOrders(),
  });

  return { orders, isLoading };
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      productApi.updateOrderStatus(orderId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};

export const useOrderFilters = (
  orders: any[],
  searchQuery: string,
  statusFilter: string,
  paymentFilter: string
) => {
  return useMemo(() => {
    return orders.filter((order: any) => {
      const matchesSearch =
        order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || order.payment_method === paymentFilter;
      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);
};

export const useOrderStats = (orders: any[]) => {
  return useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0
    );
    const pendingCount = orders.filter((o: any) => o.status === "pending").length;
    const deliveredCount = orders.filter((o: any) => o.status === "delivered").length;

    return {
      totalRevenue,
      pendingCount,
      deliveredCount,
      totalOrders: orders.length,
    };
  }, [orders]);
};
