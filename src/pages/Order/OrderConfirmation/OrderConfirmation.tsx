import React from "react";
import { ConfirmationMessage } from "./components";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <ConfirmationMessage />

      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Happens Next?
        </h2>
        <ol className="space-y-4 text-gray-600">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
              1
            </span>
            <p>We'll send you an order confirmation email shortly.</p>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
              2
            </span>
            <p>Our team will prepare your order for delivery.</p>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
              3
            </span>
            <p>You'll receive a tracking link via WhatsApp or email.</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default OrderConfirmation;
