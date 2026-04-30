import { useLocalSearchParams } from "expo-router";

import { ClassForm } from "@/features/classes/components/ClassForm";
import { useClassesStore } from "@/features/classes/store/classes.store";
import { EntityFormScreen } from "@/components/screens/EntityFormScreen";
import { useEntityForm } from "@/hooks/use-entity-form";
import type { ClassFormValues } from "@/lib/validations";

export function NewClassScreen() {
  const params = useLocalSearchParams<{ schoolId: string }>();
  const schoolId = String(params.schoolId);

  const { createClass } = useClassesStore();

  const { isSubmitting, handleSubmit } = useEntityForm<ClassFormValues>({
    onSubmit: async (values) => {
      await createClass({
        schoolId,
        name: values.name,
        shift: values.shift,
        schoolYear: values.schoolYear,
      });
    },
    successMessage: "Turma criada com sucesso.",
    errorMessage: "Não foi possível criar a turma.",
    redirectPath: `/schools/${schoolId}`,
  });

  return (
    <EntityFormScreen title="Nova turma" subtitle="Cadastre uma turma para esta escola">
      <ClassForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Criar turma"
      />
    </EntityFormScreen>
  );
}
