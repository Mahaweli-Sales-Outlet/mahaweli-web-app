import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useProductForm } from "./AdminProductForm/hooks";
import {
  ProductImageUpload,
  ProductBasicFields,
  ProductPriceAndCategory,
  ProductAdvancedFields,
  ProductFormActions,
} from "./AdminProductForm/components";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    productId,
    uploading,
    errors,
    categories,
    categoriesLoading,
    handleImageUpload,
    handleSubmit,
    saveMutation,
  } = useProductForm();

  const handleFieldChange = (updates: Partial<typeof formData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl("AdminProducts"))}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-2xl">
              {productId ? "Edit Product" : "Add New Product"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <ProductImageUpload
                imageUrl={formData.image_url}
                uploading={uploading}
                onImageUpload={handleImageUpload}
              />

              <ProductBasicFields
                formData={formData}
                onFormChange={handleFieldChange}
                errors={errors}
              />

              <ProductPriceAndCategory
                formData={formData}
                onFormChange={handleFieldChange}
                errors={errors}
                categories={categories}
                loading={categoriesLoading}
              />

              <ProductAdvancedFields
                formData={formData}
                onFormChange={handleFieldChange}
              />

              <ProductFormActions
                isLoading={saveMutation.isPending}
                onCancel={() => navigate(createPageUrl("AdminProducts"))}
                isEditing={!!productId}
                onSubmit={handleSubmit}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
