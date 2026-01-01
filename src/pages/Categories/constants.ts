/**
 * Category Constants
 */

export const CATEGORY_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#FFA07A", // Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#85C1E2", // Sky Blue
] as const;

export const CATEGORY_ICONS = {
  CLOTHING: "👕",
  ELECTRONICS: "💻",
  HOME: "🏠",
  FOOD: "🍔",
  BOOKS: "📚",
  SPORTS: "⚽",
  TOYS: "🧸",
  BEAUTY: "💄",
} as const;

export const CATEGORY_LAYOUT_OPTIONS = ["grid", "list"] as const;

export const CATEGORY_PAGE_SIZE = 12;
