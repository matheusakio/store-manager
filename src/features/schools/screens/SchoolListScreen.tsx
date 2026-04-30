import { EmptyState } from "@/components/ui/EmptyState";
import { EntityListScreen, EntityListHeader } from "@/components/screens/EntityListScreen";
import { SchoolListFilter } from "@/features/schools/components/SchoolListFilter";
import { SchoolCard } from "@/features/schools/components/SchoolCard";
import { useSchoolList } from "@/features/schools/hooks/use-school-list";

export function SchoolListScreen() {
  const {
    schools,
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
  } = useSchoolList();

  return (
    <EntityListScreen
      data={schools}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <EntityListHeader
          title="Escolas"
          subtitle={`${schools.length} unidades visíveis`}
          searchValue={schoolSearch}
          onSearchChange={setSchoolSearch}
          searchPlaceholder="Buscar por nome ou endereço"
          onNewPress={handleNavigateToNewSchool}
          newButtonLabel="Cadastrar nova escola"
          filterComponent={
            <SchoolListFilter
              value={schoolListFilter}
              onChange={setSchoolListFilter}
            />
          }
        />
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
          onPress={() => handleNavigateToSchool(item.id)}
          onEdit={() => handleNavigateToEditSchool(item.id)}
          onDelete={() => handleDeleteSchool(item.id)}
        />
      )}
    />
  );
}

