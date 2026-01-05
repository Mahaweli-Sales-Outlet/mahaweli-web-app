import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationMessageProps {
  orderNumber?: string;
}

export default function ConfirmationMessage({
  orderNumber = "#ORD-123456",
}: ConfirmationMessageProps) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-4">
        Thank you for your order. Your order has been successfully placed.
      </p>
      <p className="text-lg font-semibold text-gray-900 mb-8">
        Order Number: {orderNumber}
      </p>
      <Link
        to="/products"
        className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
