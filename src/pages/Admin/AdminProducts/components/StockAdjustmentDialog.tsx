import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StockAdjustmentDialogProps {
  isOpen: boolean;
  product: {
    id: string;
    name: string;
    stock_quantity: number;
  } | null;
  onClose: () => void;
  onAdjust: (adjustment: {
    quantity: number;
    reason: string;
    notes?: string;
  }) => void;
  isLoading: boolean;
}

const ADJUSTMENT_REASONS = [
  { value: "restock", label: "Restock" },
  { value: "sale", label: "Sale" },
  { value: "damage", label: "Damage/Loss" },
  { value: "return", label: "Return" },
  { value: "correction", label: "Stock Correction" },
  { value: "other", label: "Other" },
];

export default function StockAdjustmentDialog({
  isOpen,
  product,
  onClose,
  onAdjust,
  isLoading,
}: StockAdjustmentDialogProps) {
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!quantity || !reason) return;
    onAdjust({
      quantity: parseInt(quantity),
      reason,
      notes: notes || undefined,
    });
    // Reset form
    setQuantity("");
    setReason("");
    setNotes("");
  };

  const newStock = product
    ? product.stock_quantity + (parseInt(quantity) || 0)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
        </DialogHeader>

        {product && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600 mt-2">Current Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {product.stock_quantity} units
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Adjustment Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 50 or -10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Use positive numbers to add stock, negative to reduce
              </p>
              {quantity && (
                <p className="text-sm font-medium">
                  New stock: {newStock} units
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {ADJUSTMENT_REASONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!quantity || !reason || isLoading}
          >
            {isLoading ? "Adjusting..." : "Adjust Stock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
