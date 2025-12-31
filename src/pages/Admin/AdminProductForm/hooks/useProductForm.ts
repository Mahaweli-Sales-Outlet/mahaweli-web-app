import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { productApi } from "@/api/client";
import { INITIAL_FORM_DATA, type ProductFormData } from "../constants";

export function useProductForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);

  // Get product ID from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) setProductId(id);
  }, []);

  // Fetch products data
  const { data: productsResponse } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productApi.getAll(),
    enabled: !!productId,
  });

  const products = Array.isArray(productsResponse)
    ? productsResponse
    : productsResponse?.data || [];

  // Load product data into form when editing
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

  // Save product mutation
  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (productId) {
        return productApi.update(Number(productId), data);
      }
      return productApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      navigate(createPageUrl("AdminProducts"));
    },
  });

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Placeholder: Replace with actual upload implementation
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(String(formData.stock_quantity)),
    });
  };

  return {
    formData,
    setFormData,
    productId,
    uploading,
    handleImageUpload,
    handleSubmit,
    saveMutation,
  };
}
