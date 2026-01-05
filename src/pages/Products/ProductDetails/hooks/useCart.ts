import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export function useCart() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const addToCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setAdding(true);
    // TODO: Implement add to cart with API
    setTimeout(() => {
      navigate(createPageUrl("Cart"));
      setAdding(false);
    }, 500);
  };

  return {
    quantity,
    adding,
    incrementQuantity,
    decrementQuantity,
    addToCart,
  };
}
