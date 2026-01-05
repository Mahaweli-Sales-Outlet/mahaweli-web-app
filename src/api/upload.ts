import { api } from "./client";

export type CloudinaryFolderType = 'products' | 'categories' | 'temp';

export const uploadApi = {
  /**
   * Upload image to Cloudinary via backend
   * @param file - Image file to upload
   * @param folder - Folder type: 'products' | 'categories' | 'temp' (default: 'products')
   * @returns Cloudinary image URL
   */
  uploadImage: async (file: File, folder: CloudinaryFolderType = 'products'): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post(`/upload/image?folder=${folder}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.data?.url) {
        return response.data.data.url;
      }

      throw new Error(response.data.error?.message || 'Upload failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || error.message || 'Failed to upload image');
    }
  },

  /**
   * Upload product image to mahaweli-products/products/
   */
  uploadProductImage: async (file: File): Promise<string> => {
    return uploadApi.uploadImage(file, 'products');
  },

  /**
   * Upload category image to mahaweli-products/categories/
   */
  uploadCategoryImage: async (file: File): Promise<string> => {
    return uploadApi.uploadImage(file, 'categories');
  },

  /**
   * Upload temporary/random image to mahaweli-products/temp/
   */
  uploadTempImage: async (file: File): Promise<string> => {
    return uploadApi.uploadImage(file, 'temp');
  },
};
