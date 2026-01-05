import { Leaf, Heart, Truck, Award, type LucideIcon } from "lucide-react";

export interface Category {
  name: string;
  image: string;
  color: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  fullName: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Oils & Ghee",
    image: "https://images.unsplash.com/photo-1608181078253-f3b7875030ab?w=500&h=500&fit=crop",
    color: "from-amber-400 to-amber-600",
  },
  {
    name: "Treacle & Jaggery",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500&h=500&fit=crop",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Spices",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&h=500&fit=crop",
    color: "from-red-400 to-red-600",
  },
  {
    name: "Herbal Products",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    color: "from-green-400 to-green-600",
  },
  {
    name: "Traditional Sweets",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&h=500&fit=crop",
    color: "from-pink-400 to-pink-600",
  },
  {
    name: "Juices",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500&h=500&fit=crop",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop",
    color: "from-teal-400 to-teal-600",
  },
];

export const BENEFITS: Benefit[] = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure traditional products",
  },
  {
    icon: Heart,
    title: "Quality",
    description: "Certified authentic",
  },
  {
    icon: Truck,
    title: "Fresh",
    description: "Direct delivery",
  },
  {
    icon: Award,
    title: "Certified",
    description: "Government approved",
  },
];

export const PARTNERS: Partner[] = [
  { name: "NLDB", fullName: "National Livestock Development Board" },
  { name: "Mahaweli", fullName: "Mahaweli Authority" },
  { name: "SLSI", fullName: "Standards Institution" },
  { name: "Ayurveda", fullName: "Department of Ayurveda" },
];

export const HERO_IMAGE = "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=600&fit=crop";
