export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  image_url?: string; // for prototype compatibility
  stock: number;
  in_stock?: boolean; // prototype uses in_stock boolean
  featured?: boolean;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}
