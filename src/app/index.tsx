import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/AppHeader";
import { AppScreen } from "@/components/ui/AppScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { HeroCard } from "@/components/ui/HeroCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SearchInput } from "@/components/ui/SearchInput";

import { useAllClasses } from "@/features/classes/hooks/use-all-classes";
import { SchoolListFilter } from "@/features/schools/components/SchoolListFilter";
import { SchoolCard } from "@/features/schools/components/SchoolCard";
import { useSchoolActions } from "@/features/schools/hooks/use-school-actions";
import { useSchools } from "@/features/schools/hooks/use-schools";
import { useSchoolsUiStore } from "@/features/schools/store/schools-ui.store";
import { mapSchoolsWithClassesCount } from "@/features/schools/utils/school.mappers";

import { theme } from "@/theme";

export default function HomeScreen() {
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

  async function handleDeleteSchool(schoolId: string) {
    await deleteSchool(schoolId);
    await refetch();
    await refetchClasses();
  }

  if (isLoadingSchools || isLoadingClasses) {
    return (
      <AppScreen>
        <LoadingState label="Carregando escolas..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ErrorState message={error} onRetry={refetch} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AppHeader
              title="Escolas"
              subtitle={`${filteredSchools.length} unidades visíveis`}
            />

            <HeroCard
              eyebrow="Painel central"
              title="Gerencie escolas e turmas com mais clareza"
              description="Cadastre unidades, organize as turmas e acompanhe cada escola em um só lugar."
            />

            <SearchInput
              value={schoolSearch}
              onChangeText={setSchoolSearch}
              placeholder="Buscar por nome ou endereço"
            />

            <SchoolListFilter
              value={schoolListFilter}
              onChange={setSchoolListFilter}
            />

            <PrimaryButton
              label="Cadastrar nova escola"
              onPress={() => router.push("/schools/new")}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma escola encontrada"
            description="Cadastre sua primeira escola ou ajuste sua busca."
          />
        }
        renderItem={({ item }) => (
          <SchoolCard
            school={item}
            onPress={() => router.push(`/schools/${item.id}`)}
            onEdit={() => router.push(`/schools/${item.id}/edit`)}
            onDelete={() => handleDeleteSchool(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  headerContent: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  separator: {
    height: theme.spacing.md,
  },
});
