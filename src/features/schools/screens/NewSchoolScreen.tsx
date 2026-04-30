import { SchoolForm } from "@/features/schools/components/SchoolForm";
import { useSchoolsStore } from "@/features/schools/store/schools.store";
import { EntityFormScreen } from "@/components/screens/EntityFormScreen";
import { useEntityForm } from "@/hooks/use-entity-form";
import type { SchoolFormValues } from "@/lib/validations";

export function NewSchoolScreen() {
  const { createSchool } = useSchoolsStore();

  const { isSubmitting, handleSubmit } = useEntityForm<SchoolFormValues>({
    onSubmit: async (values) => {
      await createSchool(values);
    },
    successMessage: "Escola criada com sucesso.",
    errorMessage: "Não foi possível criar a escola.",
    redirectPath: "/",
  });

  return (
    <EntityFormScreen title="Nova escola" subtitle="Cadastre uma nova unidade">
      <SchoolForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Criar escola"
      />
    </EntityFormScreen>
  );
}
