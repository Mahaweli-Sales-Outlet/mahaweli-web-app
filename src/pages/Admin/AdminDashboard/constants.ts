import { Package, ShoppingCart, TrendingUp } from "lucide-react";

export const DASHBOARD_MENU_ITEMS = [
  {
    title: "Product Management",
    description: "Manage products, stock, and pricing",
    icon: Package,
    color: "from-green-400 to-green-600",
    link: "AdminProducts",
  },
  {
    title: "Order Management",
    description: "View and manage customer orders",
    icon: ShoppingCart,
    color: "from-blue-400 to-blue-600",
    link: "AdminOrders",
  },
  {
    title: "Analytics",
    description: "View sales reports and insights",
    icon: TrendingUp,
    color: "from-purple-400 to-purple-600",
    link: "AdminAnalytics",
  },
];

export const DASHBOARD_STAT_COLORS = {
  products: {
    bg: "bg-green-100",
    icon: "text-green-600",
  },
  orders: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
  },
  pending: {
    bg: "bg-orange-100",
    icon: "text-orange-600",
    text: "text-orange-600",
  },
  revenue: {
    bg: "bg-purple-100",
    icon: "text-purple-600",
  },
};
