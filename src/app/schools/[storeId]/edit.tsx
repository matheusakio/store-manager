import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { showError, showSuccess } from "@/components/feedback/app-alert";
import { StoreForm } from "@/features/schools/components/store-form";
import { useStoreActions } from "@/features/schools/hooks/use-store-actions";
import { useStores } from "@/features/schools/hooks/use-stores";
import type { StoreFormValues } from "@/lib/validations";

import { theme } from "@/theme";

export default function EditStoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const storeId = String(params.storeId);

  const { isLoading, error, getStoreById, refetch } = useStores();
  const { updateStore } = useStoreActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const store = useMemo(() => getStoreById(storeId), [getStoreById, storeId]);

  async function handleUpdateStore(values: StoreFormValues) {
    try {
      setIsSubmitting(true);

      await updateStore(storeId, values);

      showSuccess("Loja atualizada com sucesso.");
      router.replace("/");
    } catch {
      showError("Não foi possível atualizar a loja.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Carregando loja..." />
      </AppScreen>
    );
  }

  if (error || !store) {
    return (
      <AppScreen>
        <ErrorState
          message={error ?? "Loja não encontrada."}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Editar loja"
          subtitle="Atualize os dados da unidade"
          showBackButton
        />

        <StoreForm
          defaultValues={{
            name: store.name,
            address: store.address,
          }}
          onSubmit={handleUpdateStore}
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
