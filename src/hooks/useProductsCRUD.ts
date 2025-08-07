import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/hooks/useProducts";

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category: string;
  sku?: string;
  image_url?: string;
}

export interface ProductUpdate extends Partial<ProductInput> {
  updated_at?: string;
}

export const useProductsCRUD = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (
    productData: ProductInput
  ): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: productData.name,
            description: productData.description || null,
            price: productData.price,
            stock: productData.stock || 0,
            category: productData.category,
            sku: productData.sku || null,
            image_url: productData.image_url || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setProducts((prev) => [data, ...prev]);

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
      return null;
    }
  };

  const updateProduct = async (
    id: string,
    updates: ProductUpdate
  ): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data : product))
      );

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
      return null;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      // Update local state
      setProducts((prev) => prev.filter((product) => product.id !== id));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      return false;
    }
  };

  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
      return null;
    }
  };

  const searchProducts = async (
    searchTerm: string,
    category?: string
  ): Promise<Product[]> => {
    try {
      let query = supabase.from("products").select("*");

      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
        );
      }

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data || [];
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to search products"
      );
      return [];
    }
  };

  const getProductsByCategory = async (
    category: string
  ): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch products by category"
      );
      return [];
    }
  };

  const getCategories = async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .not("category", "is", null);

      if (error) throw error;

      // Extract unique categories
      const categories = [...new Set(data?.map((item) => item.category) || [])];
      return categories.sort();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch categories"
      );
      return [];
    }
  };

  const updateStock = async (
    id: string,
    newStock: number
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          stock: newStock,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, stock: newStock } : product
        )
      );

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update stock");
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProducts,
    getProductsByCategory,
    getCategories,
    updateStock,
  };
};
