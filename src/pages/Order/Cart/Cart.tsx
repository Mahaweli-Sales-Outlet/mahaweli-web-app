import React from "react";
import { EmptyCart, CartItem, OrderSummary } from "./components";
import { useCart } from "./hooks";

const Cart: React.FC = () => {
  const { cartItems, total, isEmpty, handleRemoveItem, handleUpdateQuantity } =
    useCart();

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.product.id}
              id={item.product.id}
              name={item.product.name}
              category={item.product.category}
              price={item.product.price}
              imageUrl={item.product.imageUrl}
              quantity={item.quantity}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary total={total} />
        </div>
      </div>
    </div>
  );
};

export default Cart;

