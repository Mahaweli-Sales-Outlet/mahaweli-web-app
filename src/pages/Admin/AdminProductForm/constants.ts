export const PRODUCT_CATEGORIES = [
  "Dairy",
  "Oils & Ghee",
  "Juices",
  "Treacle & Jaggery",
  "Traditional Sweets",
  "Herbal Products",
  "Spices",
  "Beverages",
];

export const INITIAL_FORM_DATA = {
  name: "",
  brand: "",
  description: "",
  price: "",
  category: "Dairy",
  image_url: "",
  in_stock: true,
  stock_quantity: 0,
  featured: false,
};

export type ProductFormData = typeof INITIAL_FORM_DATA;
