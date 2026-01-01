import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

interface BulkActionsProps {
  selectedIds: string[];
  onDelete: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedIds,
  onDelete,
  onActivate,
  onDeactivate,
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
              onClick={onActivate}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Activate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDeactivate}
              className="gap-2"
            >
              <XCircle className="w-4 h-4" />
              Deactivate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              className="gap-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={onClearSelection}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
}
