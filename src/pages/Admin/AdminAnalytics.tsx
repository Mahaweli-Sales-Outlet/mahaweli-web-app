import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Users,
  CheckCircle,
  CreditCard,
  Tag,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TimePeriodFilter } from "./AdminAnalytics/components";
import {
  useAnalyticsData,
  useRevenueAnalytics,
  useDailyRevenueData,
  useStockAnalytics,
  useOrderMetrics,
} from "./AdminAnalytics/hooks";
import { ANALYTICS_COLORS } from "./AdminAnalytics/constants";

export default function AdminAnalytics() {
  const [timePeriod, setTimePeriod] = useState("all");
  const [customDateRange, setCustomDateRange] = useState<{
    from?: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const { products, orders } = useAnalyticsData();
  const {
    filteredOrders,
    totalRevenue,
    avgOrderValue,
    deliveredRevenue,
    pendingRevenue,
  } = useRevenueAnalytics(orders, timePeriod, customDateRange);
  const dailyRevenueData = useDailyRevenueData(filteredOrders);
  const stockAnalytics = useStockAnalytics(products);
  const orderMetrics = useOrderMetrics(filteredOrders);

  // Revenue by category
  const categoryRevenue = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const product = products.find((p: any) => p.id === item.product_id);
        const category = product?.category || "Unknown";
        categoryMap[category] =
          (categoryMap[category] || 0) + item.product_price * item.quantity;
      });
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [filteredOrders, products]);

  // Revenue by brand
  const brandRevenue = useMemo(() => {
    const brandMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const product = products.find((p: any) => p.id === item.product_id);
        const brand = product?.brand || "Unknown";
        brandMap[brand] =
          (brandMap[brand] || 0) + item.product_price * item.quantity;
      });
    });
    return Object.entries(brandMap).map(([name, value]) => ({ name, value }));
  }, [filteredOrders, products]);

  // Payment method breakdown
  const paymentChartData = useMemo(() => {
    const paymentMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      const method = order.payment_method || "unknown";
      paymentMap[method] = (paymentMap[method] || 0) + (order.total || 0);
    });
    return Object.entries(paymentMap).map(([name, value]) => ({
      name: name.replace(/_/g, " "),
      value,
    }));
  }, [filteredOrders]);

  // Monthly revenue
  const revenueChartData = useMemo(() => {
    const monthlyMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      const date = new Date(order.created_date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + (order.total || 0);
    });
    return Object.entries(monthlyMap)
      .sort()
      .slice(-6)
      .map(([month, revenue]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
        }),
        revenue,
      }));
  }, [filteredOrders]);

  // Product analytics
  const topProducts = useMemo(() => {
    const productSalesMap: Record<string, any> = {};
    filteredOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const productId = item.product_id;
        if (!productSalesMap[productId]) {
          productSalesMap[productId] = {
            name: item.product_name,
            quantity: 0,
            revenue: 0,
            orders: 0,
          };
        }
        productSalesMap[productId].quantity += item.quantity;
        productSalesMap[productId].revenue +=
          item.product_price * item.quantity;
        productSalesMap[productId].orders += 1;
      });
    });
    return Object.values(productSalesMap)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [filteredOrders]);

  // Category distribution
  const categoryChartData = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    products.forEach((product: any) => {
      const category = product.category || "Uncategorized";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [products]);

  // Order status
  const statusChartData = useMemo(() => {
    const statusMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      const status = order.status || "unknown";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    return Object.entries(statusMap).map(([name, value]) => ({
      name: name.replace(/_/g, " "),
      value,
    }));
  }, [filteredOrders]);

  // Delivery method
  const deliveryChartData = useMemo(() => {
    const deliveryMap: Record<string, number> = {};
    filteredOrders.forEach((order: any) => {
      const method = order.delivery_method || "unknown";
      deliveryMap[method] = (deliveryMap[method] || 0) + 1;
    });
    return Object.entries(deliveryMap).map(([name, value]) => ({
      name: name.replace(/_/g, " "),
      value,
    }));
  }, [filteredOrders]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your business performance
          </p>
        </div>

        <TimePeriodFilter
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
          customDateRange={customDateRange}
          onCustomDateChange={setCustomDateRange}
        />

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
          </TabsList>

          {/* Revenue Analytics Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Total Revenue
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        LKR {totalRevenue.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Delivered
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        LKR {deliveredRevenue.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Avg Order
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        LKR {avgOrderValue.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Pending
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        LKR {pendingRevenue.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Daily Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyRevenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        `LKR ${Number(value || 0).toFixed(2)}`
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Revenue by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => `LKR ${Number(value || 0).toFixed(2)}`} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-500" />
                    Revenue by Brand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={brandRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {brandRevenue.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS[index % ANALYTICS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `LKR ${Number(value || 0).toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    Monthly Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `LKR ${Number(value || 0).toFixed(2)}`} />
                      <Bar dataKey="revenue" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    Revenue by Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {paymentChartData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS[index % ANALYTICS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `LKR ${Number(value || 0).toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Analytics Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Total Products</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {products.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">In Stock</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {stockAnalytics.inStockProducts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Low Stock</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {stockAnalytics.lowStockProducts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Out of Stock</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {stockAnalytics.outOfStockProducts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Products by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryChartData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS[index % ANALYTICS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Top 10 Products by Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {topProducts.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-green-600 text-sm">
                              #{index + 1}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {product.quantity} units
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-sm">
                            LKR {product.revenue.toFixed(0)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Analytics Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {orderMetrics.totalOrders}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Delivered</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {orderMetrics.deliveredOrders}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Customers</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {orderMetrics.uniqueCustomers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Repeat</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {orderMetrics.repeatCustomerCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-purple-500" />
                    Orders by Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {statusChartData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS[index % ANALYTICS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-500" />
                    Delivery Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={deliveryChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
