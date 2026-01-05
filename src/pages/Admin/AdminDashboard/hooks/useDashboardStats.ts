import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api";

export const useDashboardStats = () => {
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productApi.getAllProducts(),
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => productApi.getOrders(),
  });

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return {
    products,
    orders,
    totalRevenue,
    pendingOrders,
    isLoading: productsLoading || ordersLoading,
  };
};
