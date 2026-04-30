import { useCallback, useMemo } from "react";
import { useFocusEffect, useRouter } from "expo-router";

import { useAllClasses } from "@/features/classes/hooks/use-all-classes";
import { useSchoolsUiStore } from "../store/schools-ui.store";
import { useSchoolActions } from "./use-school-actions";
import { useSchools } from "./use-schools";
import { mapSchoolsWithClassesCount } from "../utils/school.mappers";

export function useSchoolList() {
  const router = useRouter();

  const {
    schools = [],
    isLoading: isLoadingSchools,
    error,
    refetch,
  } = useSchools();

  const {
    classes = [],
    isLoading: isLoadingClasses,
    refetch: refetchClasses,
  } = useAllClasses();

  const { deleteSchool } = useSchoolActions();

  const schoolSearch = useSchoolsUiStore((state) => state.schoolSearch);
  const setSchoolSearch = useSchoolsUiStore((state) => state.setSchoolSearch);
  const schoolListFilter = useSchoolsUiStore((state) => state.schoolListFilter);
  const setSchoolListFilter = useSchoolsUiStore(
    (state) => state.setSchoolListFilter,
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchClasses();
    }, [refetch, refetchClasses]),
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
      await deleteSchool(schoolId);
      await refetch();
      await refetchClasses();
    },
    [deleteSchool, refetch, refetchClasses],
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
    refetch,
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
