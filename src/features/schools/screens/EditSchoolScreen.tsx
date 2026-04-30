import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import { SchoolForm } from "@/features/schools/components/SchoolForm";
import { useSchoolActions } from "@/features/schools/hooks/use-school-actions";
import { useSchools } from "@/features/schools/hooks/use-schools";
import { EntityFormScreen } from "@/components/screens/EntityFormScreen";
import { useEntityForm } from "@/hooks/use-entity-form";
import type { SchoolFormValues } from "@/lib/validations";

export function EditSchoolScreen() {
  const params = useLocalSearchParams<{ schoolId: string }>();
  const schoolId = String(params.schoolId);

  const { isLoading, error, getSchoolById, refetch } = useSchools();
  const { updateSchool } = useSchoolActions();

  const school = useMemo(
    () => getSchoolById(schoolId),
    [getSchoolById, schoolId],
  );

  const { isSubmitting, handleSubmit } = useEntityForm<SchoolFormValues>({
    onSubmit: async (values) => {
      await updateSchool(schoolId, values);
    },
    successMessage: "Escola atualizada com sucesso.",
    errorMessage: "Não foi possível atualizar a escola.",
    redirectPath: "/",
  });

  const entityError = error || (!school && !isLoading ? "Escola não encontrada." : null);

  return (
    <EntityFormScreen
      title="Editar escola"
      subtitle="Atualize os dados da unidade"
      isLoading={isLoading}
      error={entityError}
      onRetry={refetch}
    >
      {school && (
        <SchoolForm
          defaultValues={{
            name: school.name,
            address: school.address,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Salvar alterações"
        />
      )}
    </EntityFormScreen>
  );
}
