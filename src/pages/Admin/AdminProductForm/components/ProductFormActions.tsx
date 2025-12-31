import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface ProductFormActionsProps {
  isLoading: boolean;
  onCancel: () => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProductFormActions({
  isLoading,
  onCancel,
  isEditing,
  onSubmit,
}: ProductFormActionsProps) {
  return (
    <div className="flex gap-4 pt-6 border-t border-gray-100">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="flex-1 bg-green-500 hover:bg-green-600"
        onClick={onSubmit}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? "Update Product" : "Create Product"}
          </>
        )}
      </Button>
    </div>
  );
}
