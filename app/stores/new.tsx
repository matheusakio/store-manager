import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { SectionHeader } from "@/components/ui/section-header";
import { StoreForm } from "@/features/stores/components/store-form";
import { useStoreActions } from "@/features/stores/hooks/use-store-actions";
import type { StoreFormValues } from "@/lib/validations";

export default function NewStoreScreen() {
  const router = useRouter();
  const { createStore } = useStoreActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateStore(values: StoreFormValues) {
    try {
      setIsSubmitting(true);
      await createStore(values);
      router.replace("/");
    } catch {
      Alert.alert("Erro", "Não foi possível criar a loja.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader title="Nova loja" subtitle="Cadastre uma nova filial" />

        <StoreForm
          onSubmit={handleCreateStore}
          isSubmitting={isSubmitting}
          submitLabel="Criar loja"
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
