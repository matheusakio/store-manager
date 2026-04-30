import { useCallback, useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useSchools } from "@/features/schools/hooks/use-schools";
import { useClassesUiStore } from "../store/classes-ui.store";
import { useClassActions } from "./use-class-actions";
import { useClasses } from "./use-classes";

export function useClassList() {
  const router = useRouter();
  const params = useLocalSearchParams<{ schoolId: string }>();
  const schoolId = String(params.schoolId);

  const { classes = [], isLoading, error, refetch } = useClasses(schoolId);
  const { getSchoolById, isLoading: isLoadingSchool } = useSchools();
  const { deleteSchoolClass } = useClassActions();

  const classSearch = useClassesUiStore((state) => state.classSearch);
  const selectedShift = useClassesUiStore((state) => state.selectedShift);
  const setClassSearch = useClassesUiStore((state) => state.setClassSearch);
  const setSelectedShift = useClassesUiStore((state) => state.setSelectedShift);

  const school = useMemo(
    () => getSchoolById(schoolId),
    [getSchoolById, schoolId],
  );

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const query = classSearch.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.shift.toLowerCase().includes(query) ||
        item.schoolYear.toLowerCase().includes(query);

      const matchesShift =
        selectedShift === "Todos" || item.shift === selectedShift;

      return matchesSearch && matchesShift;
    });
  }, [classSearch, classes, selectedShift]);

  const handleDeleteClass = useCallback(
    async (classId: string) => {
      await deleteSchoolClass(classId);
      await refetch();
    },
    [deleteSchoolClass, refetch],
  );

  const handleNavigateToNewClass = useCallback(() => {
    router.push(`/schools/${schoolId}/classes/new`);
  }, [router, schoolId]);

  const handleNavigateToEditClass = useCallback(
    (classId: string) => {
      router.push(`/schools/${schoolId}/classes/${classId}/edit`);
    },
    [router, schoolId],
  );

  const isLoadingCombined = isLoading || isLoadingSchool;

  return {
    classes: filteredClasses,
    school,
    isLoading: isLoadingCombined,
    error,
    refetch,
    classSearch,
    setClassSearch,
    selectedShift,
    setSelectedShift,
    handleDeleteClass,
    handleNavigateToNewClass,
    handleNavigateToEditClass,
  };
}
