import { useCallback, useMemo } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

import { useSchoolsStore } from "@/features/schools/store/schools.store";
import { useClassesUiStore } from "../store/classes-ui.store";
import { useClassesStore } from "../store/classes.store";

export function useClassList() {
  const router = useRouter();
  const params = useLocalSearchParams<{ schoolId: string }>();
  const schoolId = String(params.schoolId);

  const {
    classes,
    isLoading: isLoadingClasses,
    error,
    fetchClasses,
    deleteClassAsync,
  } = useClassesStore();

  const {
    getSchoolById,
    isLoading: isLoadingSchool,
  } = useSchoolsStore();

  const classSearch = useClassesUiStore((state) => state.classSearch);
  const selectedShift = useClassesUiStore((state) => state.selectedShift);
  const setClassSearch = useClassesUiStore((state) => state.setClassSearch);
  const setSelectedShift = useClassesUiStore((state) => state.setSelectedShift);

  useFocusEffect(
    useCallback(() => {
      fetchClasses(schoolId);
    }, [fetchClasses, schoolId]),
  );

  const school = useMemo(
    () => getSchoolById(schoolId),
    [getSchoolById, schoolId],
  );

  const classesForSchool = useMemo(() => {
    return classes.filter((c) => c.schoolId === schoolId);
  }, [classes, schoolId]);

  const filteredClasses = useMemo(() => {
    return classesForSchool.filter((item) => {
      const query = classSearch.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.shift.toLowerCase().includes(query) ||
        item.schoolYear.toLowerCase().includes(query);

      const matchesShift =
        selectedShift === "Todos" || item.shift === selectedShift;

      return matchesSearch && matchesShift;
    });
  }, [classSearch, classesForSchool, selectedShift]);

  const handleDeleteClass = useCallback(
    async (classId: string) => {
      await deleteClassAsync(classId);
      await fetchClasses(schoolId);
    },
    [deleteClassAsync, fetchClasses, schoolId],
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

  const isLoadingCombined = isLoadingClasses || isLoadingSchool;

  return {
    classes: filteredClasses,
    school,
    isLoading: isLoadingCombined,
    error,
    refetch: () => fetchClasses(schoolId),
    classSearch,
    setClassSearch,
    selectedShift,
    setSelectedShift,
    handleDeleteClass,
    handleNavigateToNewClass,
    handleNavigateToEditClass,
  };
}
