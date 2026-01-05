import { Package, ShoppingCart, TrendingUp } from "lucide-react";
import { StatCard, MenuGrid } from "./AdminDashboard/components";
import { useDashboardStats } from "./AdminDashboard/hooks";

export default function AdminDashboard() {
  const { products, orders, totalRevenue, pendingOrders, isLoading } = useDashboardStats();

  if (isLoading) {
    return <div className="min-h-screen p-8 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store from here</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Products" value={products.length} icon={<Package className="w-6 h-6" />} colorKey="products" />
          <StatCard label="Total Orders" value={orders.length} icon={<ShoppingCart className="w-6 h-6" />} colorKey="orders" />
          <StatCard label="Pending Orders" value={pendingOrders} icon={<ShoppingCart className="w-6 h-6" />} colorKey="pending" />
          <StatCard label="Total Revenue" value={`LKR ${totalRevenue.toFixed(2)}`} icon={<TrendingUp className="w-6 h-6" />} colorKey="revenue" />
        </div>

        {/* Management Sections */}
        <MenuGrid />
      </div>
    </div>
  );
}
