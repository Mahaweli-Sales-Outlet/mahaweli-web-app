import { Package, AlertCircle } from "lucide-react";

export const PRODUCT_STAT_COLORS = {
  total: { bg: "bg-green-100", icon: "text-green-600", text: "text-gray-900" },
  inStock: { bg: "bg-green-100", icon: "text-green-600", text: "text-green-600" },
  outOfStock: { bg: "bg-red-100", icon: "text-red-600", text: "text-red-600" },
  featured: { bg: "bg-purple-100", icon: "text-purple-600", text: "text-purple-600" },
};

export const STOCK_FILTER_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "in_stock", label: "In Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
];

export const STATS_CONFIG = [
  {
    key: "total",
    label: "Total Products",
    icon: Package,
    getCount: (products: any[]) => products.length,
  },
  {
    key: "inStock",
    label: "In Stock",
    icon: Package,
    getCount: (products: any[]) => products.filter((p: any) => p.in_stock).length,
  },
  {
    key: "outOfStock",
    label: "Out of Stock",
    icon: AlertCircle,
    getCount: (products: any[]) => products.filter((p: any) => !p.in_stock).length,
  },
  {
    key: "featured",
    label: "Featured",
    icon: Package,
    getCount: (products: any[]) => products.filter((p: any) => p.is_featured).length,
  },
];

export const TABLE_HEADERS = [
  { key: "product", label: "Product" },
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions", align: "right" },
];
