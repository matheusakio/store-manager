import { useCallback, useMemo } from "react";
import { useFocusEffect, useRouter } from "expo-router";

import { useClassesStore } from "@/features/classes/store/classes.store";
import { useSchoolsUiStore } from "../store/schools-ui.store";
import { useSchoolsStore } from "../store/schools.store";
import { mapSchoolsWithClassesCount } from "../utils/school.mappers";

export function useSchoolList() {
  const router = useRouter();

  const {
    schools,
    isLoading: isLoadingSchools,
    error,
    fetchSchools,
    deleteSchoolAsync,
  } = useSchoolsStore();

  const {
    classes,
    isLoading: isLoadingClasses,
    fetchAllClasses,
  } = useClassesStore();

  const schoolSearch = useSchoolsUiStore((state) => state.schoolSearch);
  const setSchoolSearch = useSchoolsUiStore((state) => state.setSchoolSearch);
  const schoolListFilter = useSchoolsUiStore((state) => state.schoolListFilter);
  const setSchoolListFilter = useSchoolsUiStore(
    (state) => state.setSchoolListFilter,
  );

  useFocusEffect(
    useCallback(() => {
      fetchSchools();
      fetchAllClasses();
    }, [fetchSchools, fetchAllClasses]),
  );

  const schoolsWithCount = useMemo(() => {
    return mapSchoolsWithClassesCount(schools, classes);
  }, [schools, classes]);

  const filteredSchools = useMemo(() => {
    const query = schoolSearch.trim().toLowerCase();

    return schoolsWithCount.filter((school) => {
      const matchesSearch =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query);

      const matchesFilter =
        schoolListFilter === "all" ||
        (schoolListFilter === "with-classes" && school.classesCount > 0) ||
        (schoolListFilter === "empty" && school.classesCount === 0);

      return matchesSearch && matchesFilter;
    });
  }, [schoolSearch, schoolListFilter, schoolsWithCount]);

  const handleDeleteSchool = useCallback(
    async (schoolId: string) => {
      await deleteSchoolAsync(schoolId);
      await fetchSchools();
      await fetchAllClasses();
    },
    [deleteSchoolAsync, fetchSchools, fetchAllClasses],
  );

  const handleNavigateToNewSchool = useCallback(() => {
    router.push("/schools/new");
  }, [router]);

  const handleNavigateToSchool = useCallback(
    (schoolId: string) => {
      router.push(`/schools/${schoolId}`);
    },
    [router],
  );

  const handleNavigateToEditSchool = useCallback(
    (schoolId: string) => {
      router.push(`/schools/${schoolId}/edit`);
    },
    [router],
  );

  const isLoading = isLoadingSchools || isLoadingClasses;

  return {
    schools: filteredSchools,
    isLoading,
    error,
    refetch: fetchSchools,
    schoolSearch,
    setSchoolSearch,
    schoolListFilter,
    setSchoolListFilter,
    handleDeleteSchool,
    handleNavigateToNewSchool,
    handleNavigateToSchool,
    handleNavigateToEditSchool,
  };
}
