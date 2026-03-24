import { useCallback, useEffect, useState } from "react";
import { storesRepository } from "../services/stores.repository";
import type { Store } from "../types/store.types";

export function useStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await storesRepository.list();

      setStores(data);
    } catch {
      setError("Não foi possível carregar as lojas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return {
    stores,
    isLoading,
    error,
    refetch: fetchStores,
  };
}
