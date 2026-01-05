import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label?: string;
  showLabel?: boolean;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  label = "Quantity",
  showLabel = true,
  min = 1,
  max,
}: QuantitySelectorProps) {
  const canDecrement = quantity > min;
  const canIncrement = max === undefined || quantity < max;

  return (
    <div>
      {showLabel && (
        <label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center border-2 border-gray-300 rounded-lg">
          <button
            onClick={onDecrement}
            disabled={!canDecrement}
            className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <span className="px-4 sm:px-6 font-bold text-gray-900 text-base sm:text-lg">
            {quantity}
          </span>
          <button
            onClick={onIncrement}
            disabled={!canIncrement}
            className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
