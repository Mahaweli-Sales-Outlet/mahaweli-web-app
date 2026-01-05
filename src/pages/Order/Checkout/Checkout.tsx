import React from "react";
import { CheckoutForm } from "./components";

const Checkout: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <p className="text-gray-600">Your cart items will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
