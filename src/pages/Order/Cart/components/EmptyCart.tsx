import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Your Cart is Empty
      </h1>
      <p className="text-gray-600 mb-8">Add some products to get started!</p>
      <Link
        to="/products"
        className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}
