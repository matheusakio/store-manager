import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SectionHeader } from "@/components/ui/section-header";
import { StoreForm } from "@/features/stores/components/store-form";
import { useStoreActions } from "@/features/stores/hooks/use-store-actions";
import { useStores } from "@/features/stores/hooks/use-stores";
import type { StoreFormValues } from "@/lib/validations";

export default function EditStoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const storeId = String(params.storeId);

  const { isLoading, error, getStoreById } = useStores();
  const { updateStore } = useStoreActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const store = useMemo(() => getStoreById(storeId), [getStoreById, storeId]);

  async function handleUpdateStore(values: StoreFormValues) {
    try {
      setIsSubmitting(true);
      await updateStore(storeId, values);
      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a loja.");
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
          onRetry={() => router.replace("/")}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader
          title="Editar loja"
          subtitle="Atualize os dados da filial"
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
    gap: 20,
  },
});
