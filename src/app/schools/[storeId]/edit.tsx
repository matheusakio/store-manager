import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { showError, showSuccess } from "@/components/feedback/app-alert";
import { SchoolForm } from "@/features/schools/components/school-form";
import { useSchoolActions } from "@/features/schools/hooks/use-school-actions";
import { useSchools } from "@/features/schools/hooks/use-schools";
import type { SchoolFormValues } from "@/lib/validations";
import { theme } from "@/theme";

export default function EditSchoolScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const schoolId = String(params.storeId);

  const { isLoading, error, getSchoolById, refetch } = useSchools();
  const { updateSchool } = useSchoolActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const school = useMemo(
    () => getSchoolById(schoolId),
    [getSchoolById, schoolId],
  );

  async function handleUpdateSchool(values: SchoolFormValues) {
    try {
      setIsSubmitting(true);

      await updateSchool(schoolId, values);

      showSuccess("Escola atualizada com sucesso.");
      router.replace("/");
    } catch {
      showError("Não foi possível atualizar a escola.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Carregando escola..." />
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
      <View style={styles.container}>
        <AppHeader
          title="Editar escola"
          subtitle="Atualize os dados da unidade"
          showBackButton
        />

        <SchoolForm
          defaultValues={{
            name: school.name,
            address: school.address,
          }}
          onSubmit={handleUpdateSchool}
          isSubmitting={isSubmitting}
          submitLabel="Salvar alterações"
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
});
