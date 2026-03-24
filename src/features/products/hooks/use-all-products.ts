import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/api/client";
import type { Product } from "../types/product.types";

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<{ products?: Product[] }>("/products");
      setProducts(Array.isArray(response?.products) ? response.products : []);
    } catch {
      setProducts([]);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}
