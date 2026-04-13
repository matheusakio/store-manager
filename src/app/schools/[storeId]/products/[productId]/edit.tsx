import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/AppHeader";
import { AppScreen } from "@/components/ui/AppScreen";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { showError, showSuccess } from "@/components/feedback/app-alert";

import type { ProductFormValues } from "@/lib/validations";
import { ClassForm } from "@/features/classes/components/ClassForm";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useClassActions } from "@/features/classes/hooks/use-class-actions";
import { theme } from "@/theme";

export default function EditClassScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    storeId: string;
    productId: string;
  }>();

  const schoolId = String(params.storeId);
  const classId = String(params.productId);

  const { classes, isLoading, error, refetch } = useClasses(schoolId);
  const { updateSchoolClass } = useClassActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const schoolClass = useMemo(
    () => classes.find((item) => item.id === classId) ?? null,
    [classes, classId],
  );

  async function handleUpdateClass(values: ProductFormValues) {
    try {
      setIsSubmitting(true);

      await updateSchoolClass(classId, {
        name: values.name,
        shift: values.category,
        schoolYear: values.price,
      });

      showSuccess("Turma atualizada com sucesso.");
      router.replace(`/schools/${schoolId}`);
    } catch {
      showError("Não foi possível atualizar a turma.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Carregando turma..." />
      </AppScreen>
    );
  }

  if (error || !schoolClass) {
    return (
      <AppScreen>
        <ErrorState
          message={error ?? "Turma não encontrada."}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Editar turma"
          subtitle="Atualize os dados da turma"
          showBackButton
        />

        <ClassForm
          defaultValues={{
            name: schoolClass.name,
            category: schoolClass.shift,
            price: schoolClass.schoolYear,
            imageUri: "",
          }}
          onSubmit={handleUpdateClass}
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
