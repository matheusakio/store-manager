import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/AppHeader";
import { AppScreen } from "@/components/ui/AppScreen";
import { showError, showSuccess } from "@/components/feedback/app-alert";

import { ClassForm } from "@/features/classes/components/ClassForm";
import { useClassActions } from "@/features/classes/hooks/use-class-actions";
import type { ProductFormValues } from "@/lib/validations";
import { theme } from "@/theme";

export default function NewClassScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const schoolId = String(params.storeId);

  const { createSchoolClass } = useClassActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateClass(values: ProductFormValues) {
    try {
      setIsSubmitting(true);

      await createSchoolClass({
        schoolId,
        name: values.name,
        shift: values.category,
        schoolYear: values.price,
      });

      showSuccess("Turma criada com sucesso.");
      router.replace(`/schools/${schoolId}`);
    } catch {
      showError("Não foi possível criar a turma.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Nova turma"
          subtitle="Cadastre uma turma para esta escola"
          showBackButton
        />

        <ClassForm
          onSubmit={handleCreateClass}
          isSubmitting={isSubmitting}
          submitLabel="Criar turma"
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
