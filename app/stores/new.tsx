import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TextField } from "@/components/forms/text-field";
import { showError, showSuccess } from "@/components/feedback/app-alert";
import { useStoreActions } from "@/features/stores/hooks/use-store-actions";
import { theme } from "@/theme";

export default function NewStoreScreen() {
  const router = useRouter();
  const { createStore } = useStoreActions();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit() {
    if (!name.trim() || !address.trim()) {
      showError("Preencha nome e endereço da loja.");
      return;
    }

    try {
      await createStore({
        name: name.trim(),
        address: address.trim(),
      });

      showSuccess("Loja criada com sucesso.");
      router.replace("/");
    } catch {
      showError("Não foi possível criar a loja.");
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Nova loja"
          subtitle="Cadastre uma nova unidade"
          showBackButton
        />

        <TextField
          label="Nome da loja"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Loja Centro"
        />

        <TextField
          label="Endereço"
          value={address}
          onChangeText={setAddress}
          placeholder="Ex: Centro - São Paulo"
        />

        <PrimaryButton label="Criar loja" onPress={handleSubmit} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
});
