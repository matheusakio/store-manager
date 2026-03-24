import { useCallback, useEffect, useState } from "react";
import { productsRepository } from "../services/products.repository";
import type { Product } from "../types/product.types";

export function useProducts(storeId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await productsRepository.listByStore(storeId);

      setProducts(data);
    } catch {
      setError("Erro ao carregar produtos.");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

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
