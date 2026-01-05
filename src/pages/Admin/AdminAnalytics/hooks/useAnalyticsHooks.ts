import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { productApi } from "@/api";

export const useAnalyticsData = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productApi.getAllProducts(),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => productApi.getOrders(),
  });

  return { products, orders };
};

export const useRevenueAnalytics = (
  orders: any[],
  timePeriod: string,
  customDateRange: { from?: Date; to?: Date }
) => {
  return useMemo(() => {
    const getFilteredOrders = () => {
      const now = new Date();
      let startDate = new Date(0);

      switch (timePeriod) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "24h":
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "48h":
          startDate = new Date(now.getTime() - 48 * 60 * 60 * 1000);
          break;
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "this_month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "custom":
          if (customDateRange.from) startDate = customDateRange.from;
          break;
        default:
          return orders;
      }

      return orders.filter((order: any) => {
        const orderDate = new Date(order.created_date);
        if (timePeriod === "custom" && customDateRange.to) {
          return orderDate >= startDate && orderDate <= customDateRange.to;
        }
        return orderDate >= startDate;
      });
    };

    const filteredOrders = getFilteredOrders();
    const totalRevenue = filteredOrders.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0
    );
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const deliveredRevenue = filteredOrders
      .filter((o: any) => o.status === "delivered")
      .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    const pendingRevenue = filteredOrders
      .filter((o: any) => o.status === "pending")
      .reduce((sum: number, order: any) => sum + (order.total || 0), 0);

    return {
      filteredOrders,
      totalRevenue,
      totalOrders,
      avgOrderValue,
      deliveredRevenue,
      pendingRevenue,
    };
  }, [orders, timePeriod, customDateRange]);
};

export const useDailyRevenueData = (orders: any[]) => {
  return useMemo(() => {
    const dailyRevenue: Record<string, number> = {};
    orders.forEach((order: any) => {
      const date = new Date(order.created_date);
      const dateKey = date.toISOString().split("T")[0];
      dailyRevenue[dateKey] = (dailyRevenue[dateKey] || 0) + (order.total || 0);
    });

    return Object.entries(dailyRevenue)
      .sort()
      .slice(-30)
      .map(([date, revenue]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue,
      }));
  }, [orders]);
};

export const useStockAnalytics = (products: any[]) => {
  return useMemo(() => ({
    inStockProducts: products.filter((p: any) => p.in_stock).length,
    outOfStockProducts: products.filter((p: any) => !p.in_stock).length,
    lowStockProducts: products.filter(
      (p: any) => p.stock_quantity > 0 && p.stock_quantity < 10
    ).length,
  }), [products]);
};

export const useOrderMetrics = (orders: any[]) => {
  return useMemo(() => {
    const uniqueCustomers = new Set(
      orders.map((o: any) => o.customer_email)
    ).size;
    const repeatCustomers = orders.reduce(
      (acc: Record<string, number>, order: any) => {
        acc[order.customer_email] = (acc[order.customer_email] || 0) + 1;
        return acc;
      },
      {}
    );
    const repeatCustomerCount = Object.values(repeatCustomers).filter(
      (count: number) => count > 1
    ).length;
    const deliveredOrders = orders.filter(
      (o: any) => o.status === "delivered"
    ).length;

    return {
      totalOrders: orders.length,
      deliveredOrders,
      uniqueCustomers,
      repeatCustomerCount,
    };
  }, [orders]);
};
