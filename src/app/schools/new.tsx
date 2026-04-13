import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/AppHeader";
import { AppScreen } from "@/components/ui/AppScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/forms/TextField";
import { showError, showSuccess } from "@/components/feedback/app-alert";
import { useSchoolActions } from "@/features/schools/hooks/use-school-actions";
import { theme } from "@/theme";

export default function NewSchoolScreen() {
  const router = useRouter();
  const { createSchool } = useSchoolActions();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit() {
    if (!name.trim() || !address.trim()) {
      showError("Preencha nome e endereço da escola.");
      return;
    }

    try {
      await createSchool({
        name: name.trim(),
        address: address.trim(),
      });

      showSuccess("Escola criada com sucesso.");
      router.replace("/");
    } catch {
      showError("Não foi possível criar a escola.");
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Nova escola"
          subtitle="Cadastre uma nova unidade"
          showBackButton
        />

        <TextField
          label="Nome da escola"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Escola Municipal Centro"
        />

        <TextField
          label="Endereço"
          value={address}
          onChangeText={setAddress}
          placeholder="Ex: Centro - Goiânia"
        />

        <PrimaryButton label="Criar escola" onPress={handleSubmit} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
});
