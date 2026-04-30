import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import type { ClassFormValues } from "@/lib/validations";
import { ClassForm } from "@/features/classes/components/ClassForm";
import { useClassesStore } from "@/features/classes/store/classes.store";
import { EntityFormScreen } from "@/components/screens/EntityFormScreen";
import { useEntityForm } from "@/hooks/use-entity-form";

export function EditClassScreen() {
  const params = useLocalSearchParams<{
    schoolId: string;
    classId: string;
  }>();

  const schoolId = String(params.schoolId);
  const classId = String(params.classId);

  const { isLoading, error, getClassById, fetchClasses, updateClassAsync } =
    useClassesStore();

  const schoolClass = useMemo(() => getClassById(classId), [getClassById, classId]);

  const { isSubmitting, handleSubmit } = useEntityForm<ClassFormValues>({
    onSubmit: async (values) => {
      await updateClassAsync(classId, values);
    },
    successMessage: "Turma atualizada com sucesso.",
    errorMessage: "Não foi possível atualizar a turma.",
    redirectPath: `/schools/${schoolId}`,
  });

  const entityError =
    error || (!schoolClass && !isLoading ? "Turma não encontrada." : null);

  return (
    <EntityFormScreen
      title="Editar turma"
      subtitle="Atualize os dados da turma"
      isLoading={isLoading}
      error={entityError}
      onRetry={() => fetchClasses(schoolId)}
    >
      {schoolClass && (
        <ClassForm
          defaultValues={{
            name: schoolClass.name,
            shift: schoolClass.shift,
            schoolYear: schoolClass.schoolYear,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Salvar alterações"
        />
      )}
    </EntityFormScreen>
  );
}
