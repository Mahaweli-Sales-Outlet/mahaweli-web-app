import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// Using native <select> elements for stability
import { ArrowLeft, Upload, Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  "Dairy",
  "Oils & Ghee",
  "Juices",
  "Treacle & Jaggery",
  "Traditional Sweets",
  "Herbal Products",
  "Spices",
  "Beverages",
];

export default function AdminProductForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "Dairy",
    image_url: "",
    in_stock: true,
    stock_quantity: 0,
    featured: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) setProductId(id);
  }, [navigate]);

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list(),
    enabled: !!productId,
  });

  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find((p: any) => p.id === productId);
      if (product) {
        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "Dairy",
          image_url: product.image_url || "",
          in_stock: product.in_stock !== undefined ? product.in_stock : true,
          stock_quantity: product.stock_quantity || 0,
          featured: product.featured || false,
        });
      }
    }
  }, [productId, products]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (productId) {
        return base44.entities.Product.update(productId, data);
      }
      return base44.entities.Product.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      navigate(createPageUrl("AdminProducts"));
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: file_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(String(formData.stock_quantity)),
    });
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
              {/* Product Image */}
              <div className="space-y-3">
                <Label>Product Image</Label>
                <div className="flex gap-6">
                  {formData.image_url && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={formData.image_url}
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
                            <p className="text-sm text-gray-600">
                              Click to upload image
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Pure Coconut Oil, Kitul Treacle"
                  required
                  className="h-12"
                />
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="e.g., Mahaweli, NLDB"
                  className="h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your product..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Price and Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (LKR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock Quantity */}
              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock Quantity</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock_quantity: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                  className="h-12"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="in_stock" className="text-base">
                      In Stock
                    </Label>
                    <p className="text-sm text-gray-600">
                      Product is available for purchase
                    </p>
                  </div>
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, in_stock: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured" className="text-base">
                      Featured Product
                    </Label>
                    <p className="text-sm text-gray-600">Show on homepage</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(createPageUrl("AdminProducts"))}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {productId ? "Update Product" : "Create Product"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
