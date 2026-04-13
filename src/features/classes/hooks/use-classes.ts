import { useCallback, useEffect, useState } from "react";
import { classesRepository } from "../services/classes.repository";
import type { SchoolClass } from "../types/class.types";
import { useAppStore } from "@/store/app-store";

export function useClasses(schoolId: string) {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetProductFilters = useAppStore((state) => state.resetProductFilters);

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await classesRepository.listBySchool(schoolId);
      setClasses(Array.isArray(data) ? data : []);
    } catch {
      setClasses([]);
      setError("Erro ao carregar turmas.");
    } finally {
      setIsLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    resetProductFilters();
    fetchClasses();
  }, [fetchClasses, resetProductFilters]);

  return {
    classes,
    isLoading,
    error,
    refetch: fetchClasses,
  };
}
