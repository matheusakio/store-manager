import { useCallback, useEffect, useState } from "react";
import { schoolsRepository } from "../services/schools.repository";
import type { School } from "../types/school.types";

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await schoolsRepository.list();
      setSchools(Array.isArray(data) ? data : []);
    } catch {
      setSchools([]);
      setError("Erro ao carregar escolas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const getSchoolById = useCallback(
    (schoolId: string) => schools.find((item) => item.id === schoolId) ?? null,
    [schools],
  );

  return {
    schools,
    isLoading,
    error,
    refetch: fetchSchools,
    getSchoolById,
  };
}
