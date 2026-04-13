import { useCallback, useEffect, useState } from "react";
import { classesRepository } from "../services/classes.repository";
import type { SchoolClass } from "../types/class.types";
import { useClassesUiStore } from "../store/classes-ui.store";

export function useClasses(schoolId: string) {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetClassFilters = useClassesUiStore(
    (state) => state.resetClassFilters,
  );

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
    resetClassFilters();
    fetchClasses();
  }, [fetchClasses, resetClassFilters]);

  return {
    classes,
    isLoading,
    error,
    refetch: fetchClasses,
  };
}
