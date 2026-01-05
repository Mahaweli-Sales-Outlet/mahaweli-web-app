import { Clock, CheckCircle, Package, Truck, XCircle } from "lucide-react";

export const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-orange-100 text-orange-700",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  processing: {
    label: "Processing",
    color: "bg-purple-100 text-purple-700",
    icon: Package,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-indigo-100 text-indigo-700",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export const ORDER_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: "all", label: "All Methods" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "online_payment", label: "Online Payment" },
];

export const ORDER_STAT_COLORS = {
  total: { bg: "bg-blue-100", icon: "text-blue-600", text: "text-gray-900" },
  pending: { bg: "bg-orange-100", icon: "text-orange-600", text: "text-orange-600" },
  delivered: { bg: "bg-green-100", icon: "text-green-600", text: "text-green-600" },
  revenue: { bg: "bg-purple-100", icon: "text-purple-600", text: "text-gray-900" },
};
