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
import { mapSchoolsWithClassesCount } from "@/features/schools/utils/school.mappers";

import { useAppStore } from "@/store/app-store";
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

  const storeSearch = useAppStore((state) => state.storeSearch);
  const setStoreSearch = useAppStore((state) => state.setStoreSearch);
  const storeListFilter = useAppStore((state) => state.storeListFilter);
  const setSchoolListFilter = useAppStore((state) => state.setSchoolListFilter);

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
    const query = storeSearch.trim().toLowerCase();

    return schoolsWithCount.filter((school) => {
      const matchesSearch =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query);

      const matchesFilter =
        storeListFilter === "all" ||
        (storeListFilter === "with-products" && school.classesCount > 0) ||
        (storeListFilter === "empty" && school.classesCount === 0);

      return matchesSearch && matchesFilter;
    });
  }, [storeSearch, storeListFilter, schoolsWithCount]);

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
              value={storeSearch}
              onChangeText={setStoreSearch}
              placeholder="Buscar por nome ou endereço"
            />

            <SchoolListFilter
              value={storeListFilter}
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
