import { Clock, Package, CheckCircle } from "lucide-react";
import { ORDER_STAT_COLORS } from "../constants";

interface OrderStatsProps {
  stats: {
    totalOrders: number;
    pendingCount: number;
    deliveredCount: number;
    totalRevenue: number;
  };
}

export default function OrderStats({ stats }: OrderStatsProps) {
  const statConfigs = [
    {
      key: "total",
      label: "Total Orders",
      value: stats.totalOrders,
      icon: Package,
    },
    {
      key: "pending",
      label: "Pending",
      value: stats.pendingCount,
      icon: Clock,
    },
    {
      key: "delivered",
      label: "Delivered",
      value: stats.deliveredCount,
      icon: CheckCircle,
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: `LKR ${stats.totalRevenue.toFixed(2)}`,
      icon: Package,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {statConfigs.map((stat) => {
        const colors =
          ORDER_STAT_COLORS[stat.key as keyof typeof ORDER_STAT_COLORS];
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${colors.text}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
