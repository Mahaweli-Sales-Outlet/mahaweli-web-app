import { DASHBOARD_STAT_COLORS } from "../constants";
import { Package, ShoppingCart, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorKey: "products" | "orders" | "pending" | "revenue";
}

export default function StatCard({ label, value, icon, colorKey }: StatCardProps) {
  const colors = DASHBOARD_STAT_COLORS[colorKey];
  const textClass = colorKey === "pending" ? "text-orange-600" : "text-gray-900";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <div className={colors.icon}>{icon}</div>
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${textClass}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
