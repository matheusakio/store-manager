import { EmptyState } from "@/components/ui/EmptyState";
import { EntityListScreen, EntityListHeader } from "@/components/screens/EntityListScreen";
import { ShiftSelector } from "@/features/classes/components/ShiftSelector";
import { ClassCard } from "@/features/classes/components/ClassCard";
import { useClassList } from "@/features/classes/hooks/use-class-list";

export function ClassListScreen() {
  const {
    classes,
    school,
    isLoading,
    error,
    refetch,
    classSearch,
    setClassSearch,
    selectedShift,
    setSelectedShift,
    handleDeleteClass,
    handleNavigateToNewClass,
    handleNavigateToEditClass,
  } = useClassList();

  const entityError = error || (!school ? "Escola não encontrada." : null);

  return (
    <EntityListScreen
      data={classes}
      isLoading={isLoading}
      error={entityError}
      onRetry={refetch}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        school ? (
          <EntityListHeader
            title={school.name}
            subtitle={school.address}
            searchValue={classSearch}
            onSearchChange={setClassSearch}
            searchPlaceholder="Buscar turma, turno ou ano letivo"
            onNewPress={handleNavigateToNewClass}
            newButtonLabel="Cadastrar nova turma"
            showBackButton
            filterComponent={
              <ShiftSelector
                value={selectedShift}
                onChange={setSelectedShift}
                includeAllOption
              />
            }
          />
        ) : null
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
          onEdit={() => handleNavigateToEditClass(item.id)}
          onDelete={() => handleDeleteClass(item.id)}
        />
      )}
    />
  );
}

