import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import type { ClassFormValues } from "@/lib/validations";
import { ClassForm } from "@/features/classes/components/ClassForm";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useClassActions } from "@/features/classes/hooks/use-class-actions";
import { EntityFormScreen } from "@/components/screens/EntityFormScreen";
import { useEntityForm } from "@/hooks/use-entity-form";

export function EditClassScreen() {
  const params = useLocalSearchParams<{
    schoolId: string;
    classId: string;
  }>();

  const schoolId = String(params.schoolId);
  const classId = String(params.classId);

  const { classes, isLoading, error, refetch } = useClasses(schoolId);
  const { updateSchoolClass } = useClassActions();

  const schoolClass = useMemo(
    () => classes.find((item) => item.id === classId) ?? null,
    [classes, classId],
  );

  const { isSubmitting, handleSubmit } = useEntityForm<ClassFormValues>({
    onSubmit: async (values) => {
      await updateSchoolClass(classId, {
        name: values.name,
        shift: values.shift,
        schoolYear: values.schoolYear,
      });
    },
    successMessage: "Turma atualizada com sucesso.",
    errorMessage: "Não foi possível atualizar a turma.",
    redirectPath: `/schools/${schoolId}`,
  });

  const entityError = error || (!schoolClass && !isLoading ? "Turma não encontrada." : null);

  return (
    <EntityFormScreen
      title="Editar turma"
      subtitle="Atualize os dados da turma"
      isLoading={isLoading}
      error={entityError}
      onRetry={refetch}
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
