import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderDetailsDialogProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsDialog({
  order,
  isOpen,
  onClose,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Customer Information
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-gray-600">Name:</span>{" "}
                  {order.customer_name}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {order.customer_email}
                </p>
                <p>
                  <span className="text-gray-600">Phone:</span>{" "}
                  {order.customer_phone}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery Information
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-gray-600">Method:</span>{" "}
                  {order.delivery_method?.replace(/_/g, " ")}
                </p>
                {order.delivery_address && (
                  <p>
                    <span className="text-gray-600">Address:</span>{" "}
                    {order.delivery_address}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.product_image ||
                        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=100&h=100&fit=crop"
                      }
                      alt={item.product_name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    LKR {(item.product_price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">
                  LKR {order.subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium text-gray-900">
                  LKR {order.delivery_fee?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-green-600">
                  LKR {order.total?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Notes</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
