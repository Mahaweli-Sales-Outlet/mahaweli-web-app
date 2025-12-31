import { Link } from "react-router-dom";

interface OrderSummaryProps {
  total: number;
  deliveryStatus?: string;
}

export default function OrderSummary({
  total,
  deliveryStatus = "TBD",
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>LKR {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span>{deliveryStatus}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>LKR {total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        to="/checkout"
        className="block w-full bg-green-500 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
