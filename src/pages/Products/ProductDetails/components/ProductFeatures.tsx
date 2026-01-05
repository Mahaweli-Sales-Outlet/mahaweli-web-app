import { CheckCircle } from "lucide-react";
import { PRODUCT_FEATURES } from "../constants";

export default function ProductFeatures() {
  return (
    <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-100">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
        Why Choose This Product
      </h2>
      <ul className="space-y-1.5 sm:space-y-2">
        {PRODUCT_FEATURES.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm"
          >
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
