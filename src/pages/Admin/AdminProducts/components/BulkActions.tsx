import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface BulkActionsProps {
  selectedIds: string[];
  onDelete: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedIds,
  onDelete,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.length} product{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClearSelection}
          className="text-gray-600"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
}

