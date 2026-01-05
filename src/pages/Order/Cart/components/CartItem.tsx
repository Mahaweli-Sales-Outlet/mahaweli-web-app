import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export default function CartItem({
  id,
  name,
  category,
  price,
  imageUrl,
  quantity,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex gap-4">
      <img
        src={
          imageUrl || "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=200&h=200&fit=crop"
        }
        alt={name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{category}</p>
        <p className="text-lg font-bold text-green-500">
          LKR {price.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-600 p-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
