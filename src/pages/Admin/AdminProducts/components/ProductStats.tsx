import { PRODUCT_STAT_COLORS, STATS_CONFIG } from "../constants";

interface ProductStatsProps {
  products: any[];
}

export default function ProductStats({ products }: ProductStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {STATS_CONFIG.map((stat) => {
        const count = stat.getCount(products);
        const colors = PRODUCT_STAT_COLORS[stat.key as keyof typeof PRODUCT_STAT_COLORS];
        const Icon = stat.icon;

        return (
          <div key={stat.key} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${colors.text}`}>{count}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
