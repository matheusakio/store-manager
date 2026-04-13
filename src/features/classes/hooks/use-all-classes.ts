import { useCallback, useEffect, useState } from "react";
import { classesRepository } from "../services/classes.repository";
import type { SchoolClass } from "../types/class.types";

export function useAllClasses() {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await classesRepository.listAll();
      setClasses(Array.isArray(data) ? data : []);
    } catch {
      setClasses([]);
      setError("Não foi possível carregar as turmas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return {
    classes,
    isLoading,
    error,
    refetch: fetchClasses,
  };
}
