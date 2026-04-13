import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SearchInput } from "@/components/ui/search-input";

import { ShiftFilter } from "@/features/classes/components/shift-filter";
import { ClassCard } from "@/features/classes/components/class-card";
import { useClassActions } from "@/features/classes/hooks/use-class-actions";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useSchools } from "@/features/schools/hooks/use-schools";

import { useAppStore } from "@/store/app-store";
import { theme } from "@/theme";

export default function SchoolDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const schoolId = String(params.storeId);

  const { classes = [], isLoading, error, refetch } = useClasses(schoolId);
  const { getSchoolById, isLoading: isLoadingSchool } = useSchools();
  const { deleteSchoolClass } = useClassActions();

  const productSearch = useAppStore((state) => state.productSearch);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setProductSearch = useAppStore((state) => state.setProductSearch);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  const school = useMemo(
    () => getSchoolById(schoolId),
    [getSchoolById, schoolId],
  );

  const filteredClasses = useMemo(() => {
    return (classes ?? []).filter((item) => {
      const query = productSearch.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.shift.toLowerCase().includes(query) ||
        item.schoolYear.toLowerCase().includes(query);

      const matchesShift =
        selectedCategory === "Todos" || item.shift === selectedCategory;

      return matchesSearch && matchesShift;
    });
  }, [productSearch, classes, selectedCategory]);

  async function handleDeleteClass(classId: string) {
    await deleteSchoolClass(classId);
    await refetch();
  }

  if (isLoading || isLoadingSchool) {
    return (
      <AppScreen>
        <LoadingState label="Carregando turmas..." />
      </AppScreen>
    );
  }

  if (error || !school) {
    return (
      <AppScreen>
        <ErrorState
          message={error ?? "Escola não encontrada."}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AppHeader
              title={school.name}
              subtitle={school.address}
              showBackButton
            />

            <SearchInput
              value={productSearch}
              onChangeText={setProductSearch}
              placeholder="Buscar turma, turno ou ano letivo"
            />

            <ShiftFilter
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            <PrimaryButton
              label="Cadastrar nova turma"
              onPress={() => router.push(`/schools/${schoolId}/products/new`)}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma turma encontrada"
            description="Cadastre uma turma ou ajuste os filtros."
          />
        }
        renderItem={({ item }) => (
          <ClassCard
            schoolClass={item}
            onEdit={() =>
              router.push(`/schools/${schoolId}/products/${item.id}/edit`)
            }
            onDelete={() => handleDeleteClass(item.id)}
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
