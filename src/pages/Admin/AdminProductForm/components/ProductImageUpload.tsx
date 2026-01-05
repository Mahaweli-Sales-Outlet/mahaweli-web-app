import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";

interface ProductImageUploadProps {
  imageUrl: string;
  uploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductImageUpload({
  imageUrl,
  uploading,
  onImageUpload,
}: ProductImageUploadProps) {
  return (
    <div className="space-y-3">
      <Label>Product Image</Label>
      <div className="flex gap-6">
        {imageUrl && (
          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200">
            <img
              src={imageUrl}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 transition-colors">
            <div className="text-center">
              {uploading ? (
                <Loader2 className="w-8 h-8 mx-auto text-green-500 animate-spin" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
