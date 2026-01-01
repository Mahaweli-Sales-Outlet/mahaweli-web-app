import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { productApi } from "@/api/products";
import { uploadApi } from "@/api/upload";
import { categoryApi } from "@/api/categories";
import { INITIAL_FORM_DATA, type ProductFormData } from "../constants";
import type { Category } from "@/types/category.types";

export function useProductForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get product ID from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) setProductId(id);
  }, []);

  // Fetch all categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAllCategories(),
  });

  const categories: Category[] = Array.isArray(categoriesData)
    ? categoriesData.flatMap((cat: any) => {
        // Handle both flat arrays and hierarchical responses
        const result: Category[] = [];
        if (cat.id) result.push(cat);
        if (cat.children && Array.isArray(cat.children)) {
          result.push(...cat.children);
        }
        return result;
      })
    : [];

  // Fetch single product when editing
  const { data: product } = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: () => productApi.getById(productId!),
    enabled: !!productId,
  });

  // Load product data into form when editing
  useEffect(() => {
    if (productId && product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        price: String(product.price) || "",
        category_id: product.category_id || "",
        image_url: product.image_url || "",
        in_stock: product.stock_quantity > 0,
        stock_quantity: product.stock_quantity || 0,
        featured: product.is_featured || false,
      });
    }
  }, [productId, product]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price)) {
      newErrors.price = "Valid price is required";
    } else if (price <= 0) {
      newErrors.price = "Price must be greater than 0";
    } else if (price > 1000000) {
      newErrors.price = "Price seems too high";
    }

    const stock = parseInt(String(formData.stock_quantity));
    if (stock < 0) {
      newErrors.stock_quantity = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save product mutation
  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (productId) {
        return productApi.update(productId, data);
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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);
    try {
      // Upload to mahaweli-products/products/ folder
      const imageUrl = await uploadApi.uploadProductImage(file);
      setFormData({ ...formData, image_url: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    saveMutation.mutate({
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: parseFloat(formData.price),
      category_id: formData.category_id || null,
      image_url: formData.image_url,
      stock_quantity: parseInt(String(formData.stock_quantity)),
      is_featured: formData.featured,
    });
  };

  return {
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
  };
}
