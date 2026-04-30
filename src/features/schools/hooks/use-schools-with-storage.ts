import { useCallback, useEffect, useState } from "react";
import { schoolsRepository } from "../services/schools.repository";
import { storage } from "@/services/storage";
import type { School } from "../types/school.types";

export function useSchoolsWithStorage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFromApi = useCallback(async () => {
    try {
      const data = await schoolsRepository.list();
      setSchools(data);
      await storage.setSchools(data);
      setError(null);
    } catch {
      setError("Erro ao carregar escolas do servidor");
    }
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    
    // First try to load from storage
    const cachedSchools = await storage.getSchools<School[]>();
    if (cachedSchools) {
      setSchools(cachedSchools);
      setIsLoading(false);
    }

    // Then fetch from API
    await fetchFromApi();
    setIsLoading(false);
  }, [fetchFromApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  const getSchoolById = useCallback(
    (id: string) => {
      return schools.find((school) => school.id === id) ?? null;
    },
    [schools],
  );

  return {
    schools,
    isLoading,
    error,
    refetch,
    getSchoolById,
  };
}
