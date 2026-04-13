import { useCallback, useEffect, useState } from "react";
import { productsRepository } from "../services/products.repository";
import type { Product } from "../types/product.types";
import { useAppStore } from "@/store/app-store";

export function useProducts(storeId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetProductFilters = useAppStore((state) => state.resetProductFilters);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await productsRepository.listByStore(storeId);
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
      setError("Erro ao carregar produtos.");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    resetProductFilters();
    fetchProducts();
  }, [fetchProducts, resetProductFilters]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}
