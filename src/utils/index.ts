import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPageUrl(name: string): string {
  switch (name) {
    case "HomePage":
      return "/";
    case "Products":
      return "/products";
    case "ProductDetail":
      return "/products"; // Use with id param or query separately
    case "Cart":
      return "/cart";
    case "Checkout":
      return "/checkout";
    case "OrderConfirmation":
      return "/order-confirmation";
    case "About":
      return "/about";
    case "Contact":
      return "/contact";
    case "AdminDashboard":
      return "/admin/dashboard";
    case "AdminProducts":
      return "/admin/products";
    case "AdminProductForm":
      return "/admin/products/new";
    case "AdminOrders":
      return "/admin/orders";
    case "AdminAnalytics":
      return "/admin/analytics";
    default:
      return "/";
  }
}
