import { useCallback, useEffect, useState } from "react";
import { Store } from "../types/school.types";
import { storesRepository } from "../services/schools.repository";

export function useStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await storesRepository.list();
      setStores(Array.isArray(data) ? data : []);
    } catch {
      setStores([]);
      setError("Não foi possível carregar as lojas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const getStoreById = useCallback(
    (storeId: string) => stores.find((store) => store.id === storeId) ?? null,
    [stores],
  );

  return {
    stores,
    isLoading,
    error,
    refetch: fetchStores,
    getStoreById,
  };
}
