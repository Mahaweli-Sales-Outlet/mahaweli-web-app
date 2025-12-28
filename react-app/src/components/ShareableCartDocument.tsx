import React from "react";
import { useAppSelector } from "../redux/hooks";

const ShareableCartDocument: React.FC = () => {
  const cartItems = useAppSelector((s) => s.cart.items);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>LKR {(item.product.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareableCartDocument;
