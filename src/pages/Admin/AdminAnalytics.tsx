import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Users,
  Clock,
  CheckCircle,
  CreditCard,
  CalendarIcon,
  Tag,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";

export default function AdminAnalytics() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState("all");
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => base44.entities.Order.list("-created_date"),
  });

  // Filter orders by time period
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
        if (customDateRange.from) {
          startDate = customDateRange.from;
        }
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

  // Revenue Analytics
  const totalRevenue = filteredOrders.reduce(
    (sum: number, order: any) => sum + (order.total || 0),
    0
  );
  const totalOrders = filteredOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const deliveredOrders = filteredOrders.filter(
    (o: any) => o.status === "delivered"
  );
  const deliveredRevenue = deliveredOrders.reduce(
    (sum: number, order: any) => sum + (order.total || 0),
    0
  );
  const pendingRevenue = filteredOrders
    .filter((o: any) => o.status === "pending")
    .reduce((sum: number, order: any) => sum + (order.total || 0), 0);

  // Revenue by category
  const categoryRevenue: Record<string, number> = {};
  filteredOrders.forEach((order: any) => {
    order.items?.forEach((item: any) => {
      const product = products.find((p: any) => p.id === item.product_id);
      const category = product?.category || "Unknown";
      categoryRevenue[category] =
        (categoryRevenue[category] || 0) + item.product_price * item.quantity;
    });
  });

  const categoryRevenueData = Object.entries(categoryRevenue).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Revenue by brand
  const brandRevenue: Record<string, number> = {};
  filteredOrders.forEach((order: any) => {
    order.items?.forEach((item: any) => {
      const product = products.find((p: any) => p.id === item.product_id);
      const brand = product?.brand || "Unknown";
      brandRevenue[brand] =
        (brandRevenue[brand] || 0) + item.product_price * item.quantity;
    });
  });

  const brandRevenueData = Object.entries(brandRevenue).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Payment method breakdown
  const paymentMethodRevenue = filteredOrders.reduce(
    (acc: Record<string, number>, order: any) => {
      const method = order.payment_method || "unknown";
      acc[method] = (acc[method] || 0) + (order.total || 0);
      return acc;
    },
    {}
  );

  const paymentChartData = Object.entries(paymentMethodRevenue).map(
    ([name, value]) => ({
      name: name.replace(/_/g, " "),
      value: value,
    })
  );

  // Daily revenue
  const dailyRevenue: Record<string, number> = {};
  filteredOrders.forEach((order: any) => {
    const date = new Date(order.created_date);
    const dateKey = date.toISOString().split("T")[0];
    dailyRevenue[dateKey] = (dailyRevenue[dateKey] || 0) + (order.total || 0);
  });

  const dailyRevenueData = Object.entries(dailyRevenue)
    .sort()
    .slice(-30)
    .map(([date, revenue]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: revenue,
    }));

  // Monthly revenue
  const monthlyRevenue = filteredOrders.reduce(
    (acc: Record<string, number>, order: any) => {
      const date = new Date(order.created_date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      acc[monthKey] = (acc[monthKey] || 0) + (order.total || 0);
      return acc;
    },
    {}
  );

  const revenueChartData = Object.entries(monthlyRevenue)
    .sort()
    .slice(-6)
    .map(([month, revenue]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-US", {
        month: "short",
      }),
      revenue: revenue,
    }));

  // Product Analytics
  const productSales: Record<string, any> = {};
  filteredOrders.forEach((order: any) => {
    order.items?.forEach((item: any) => {
      const productId = item.product_id;
      if (!productSales[productId]) {
        productSales[productId] = {
          name: item.product_name,
          quantity: 0,
          revenue: 0,
          orders: 0,
        };
      }
      productSales[productId].quantity += item.quantity;
      productSales[productId].revenue += item.product_price * item.quantity;
      productSales[productId].orders += 1;
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 10);

  const categoryData = products.reduce(
    (acc: Record<string, number>, product: any) => {
      const category = product.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );

  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Stock analytics
  const inStockProducts = products.filter((p: any) => p.in_stock).length;
  const outOfStockProducts = products.filter((p: any) => !p.in_stock).length;
  const lowStockProducts = products.filter(
    (p: any) => p.stock_quantity > 0 && p.stock_quantity < 10
  ).length;

  // Order Analytics
  const statusData = filteredOrders.reduce(
    (acc: Record<string, number>, order: any) => {
      const status = order.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
  }));

  // Customer analytics
  const uniqueCustomers = new Set(
    filteredOrders.map((o: any) => o.customer_email)
  ).size;
  const repeatCustomers = filteredOrders.reduce(
    (acc: Record<string, number>, order: any) => {
      acc[order.customer_email] = (acc[order.customer_email] || 0) + 1;
      return acc;
    },
    {}
  );
  const repeatCustomerCount = Object.values(repeatCustomers).filter(
    (count: number) => count > 1
  ).length;

  // Delivery method breakdown
  const deliveryMethodData = filteredOrders.reduce(
    (acc: Record<string, number>, order: any) => {
      const method = order.delivery_method || "unknown";
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    },
    {}
  );

  const deliveryChartData = Object.entries(deliveryMethodData).map(
    ([name, value]) => ({
      name: name.replace(/_/g, " "),
      value,
    })
  );

  // Price history for selected product
  const selectedProductData = products.find(
    (p: any) => p.id === selectedProduct
  );
  const priceHistoryData =
    selectedProductData?.price_history?.map((entry: any) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: entry.price,
    })) || [];

  if (selectedProductData && priceHistoryData.length === 0) {
    priceHistoryData.push({
      date: "Current",
      price: selectedProductData.price,
    });
  }

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
  ];

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

        {/* Time Period Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-900">
                  Time Period:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="48h">Last 48 Hours</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {timePeriod === "custom" && (
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-auto">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {customDateRange.from ? (
                          customDateRange.to ? (
                            <>
                              {format(customDateRange.from, "MMM dd")} -{" "}
                              {format(customDateRange.to, "MMM dd, yyyy")}
                            </>
                          ) : (
                            format(customDateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Select dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{
                          from: customDateRange.from,
                          to: customDateRange.to,
                        }}
                        onSelect={(range) =>
                          setCustomDateRange({
                            from: range?.from,
                            to: range?.to,
                          })
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
            {/* Revenue Key Metrics */}
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
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
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

            {/* Daily Revenue Trend */}
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
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
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

            {/* Revenue by Category & Brand */}
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
                    <BarChart data={categoryRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) =>
                          `LKR ${Number(value || 0).toFixed(2)}`
                        }
                      />
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
                        data={brandRevenueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {brandRevenueData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) =>
                          `LKR ${Number(value || 0).toFixed(2)}`
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Revenue & Payment Methods */}
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
                      <Tooltip
                        formatter={(value) =>
                          `LKR ${Number(value || 0).toFixed(2)}`
                        }
                      />
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
                        {paymentChartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) =>
                          `LKR ${Number(value || 0).toFixed(2)}`
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Analytics Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Product Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Total Products
                      </p>
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
                      <p className="text-xs sm:text-sm text-gray-600">
                        In Stock
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {inStockProducts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Low Stock
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {lowStockProducts}
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
                      <p className="text-xs sm:text-sm text-gray-600">
                        Out of Stock
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {outOfStockProducts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price History */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Product Price History
                  </CardTitle>
                  <Select
                    value={selectedProduct || ""}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {priceHistoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) =>
                          `LKR ${Number(value || 0).toFixed(2)}`
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Price (LKR)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Select a product to view price history
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Category Distribution & Top Products */}
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
                        {categoryChartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
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
                    {topProducts.map((product, index) => (
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
            {/* Order Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Total Orders
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {totalOrders}
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
                      <p className="text-xs sm:text-sm text-gray-600">
                        Delivered
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {deliveredOrders.length}
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
                      <p className="text-xs sm:text-sm text-gray-600">
                        Customers
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {uniqueCustomers}
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
                        {repeatCustomerCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Status & Delivery Method */}
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
                        {statusChartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
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
