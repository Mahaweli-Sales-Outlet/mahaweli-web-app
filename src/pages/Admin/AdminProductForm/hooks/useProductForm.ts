import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { uploadApi } from "@/api/upload";
import { categoryApi } from "@/api/categories";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductByIdThunk,
  createProductThunk,
  updateProductThunk,
  selectSelectedProduct,
  selectProductLoading,
  selectProductError,
  clearError,
} from "@/redux/slices/productSlice";
import { INITIAL_FORM_DATA, type ProductFormData } from "../constants";
import type { Category } from "@/types/category.types";

export function useProductForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const hasLoadedProductRef = useRef(false);

  // Redux selectors
  const product = useAppSelector(selectSelectedProduct);
  const reduxLoading = useAppSelector(selectProductLoading);
  const reduxError = useAppSelector(selectProductError);

  // Get product ID from URL and fetch product data when ID changes
  useEffect(() => {
    const id = searchParams.get("id");
    
    if (id !== productId) {
      // Product ID has changed (or initial load)
      setProductId(id);
      hasLoadedProductRef.current = false;
      
      if (id) {
        // Editing existing product - fetch it
        dispatch(fetchProductByIdThunk(id));
      } else {
        // Creating new product - reset form
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
      }
    }
  }, [searchParams, productId, dispatch]);

  // Fetch all categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAllCategories(),
  });

  const categories: Category[] = Array.isArray(categoriesData)
    ? categoriesData.flatMap((cat: any) => {
        const result: Category[] = [];
        if (cat.id) result.push(cat);
        if (cat.children && Array.isArray(cat.children)) {
          result.push(...cat.children);
        }
        return result;
      })
    : [];

  // Load product data into form when editing - only once when product is first loaded
  useEffect(() => {
    if (productId && product && product.id === productId && !hasLoadedProductRef.current) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        price: String(product.price) || "",
        category_id: product.category_id || "",
        image_url: product.image_url || "",
        in_stock: product.stock_quantity > 0,
        stock_quantity: product.stock_quantity || 0,
        is_featured: product.is_featured || false,
        is_active: product.is_active !== undefined ? product.is_active : true,
      });
      hasLoadedProductRef.current = true;
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
      const imageUrl = await uploadApi.uploadProductImage(file);
      setFormData({ ...formData, image_url: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission with Redux dispatch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted, validating...");
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    console.log("Validation passed, preparing data...");
    setSubmitLoading(true);
    const productData = {
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: parseFloat(formData.price),
      category_id: formData.category_id || undefined,
      image_url: formData.image_url,
      stock_quantity: parseInt(String(formData.stock_quantity)),
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    console.log("Product data prepared:", productData);

    try {
      let result;
      if (productId) {
        console.log("Updating product:", productId);
        result = await dispatch(
          updateProductThunk({ id: productId, data: productData })
        );
      } else {
        console.log("Creating new product");
        result = await dispatch(createProductThunk(productData));
      }

      console.log("Dispatch result:", result);

      if (
        createProductThunk.fulfilled.match(result) ||
        updateProductThunk.fulfilled.match(result)
      ) {
        console.log("Product saved successfully, navigating...");
        navigate(createPageUrl("AdminProducts"));
      } else {
        console.log("Product save failed:", result);
        setSubmitLoading(false);
        // Show error from Redux state
        if (reduxError) {
          alert(`Failed to save product: ${reduxError}`);
        }
      }
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error saving product:", error);
      alert(`Error saving product: ${error}`);
    }
  };

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return {
    formData,
    setFormData,
    productId,
    uploading,
    errors,
    categories,
    categoriesLoading,
    loading: reduxLoading || submitLoading,
    error: reduxError,
    handleImageUpload,
    handleSubmit,
  };
}
