import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/text-field";
import { storeSchema, type SchoolFormValues } from "@/lib/validations";

type SchoolFormProps = {
  defaultValues?: SchoolFormValues;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: SchoolFormValues) => Promise<void> | void;
};

export function SchoolForm({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Salvar",
  onSubmit,
}: SchoolFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: defaultValues ?? {
      name: "",
      address: "",
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Nome da loja"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Loja Centro"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Endereço"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Centro - São Paulo"
            error={errors.address?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText>{isSubmitting ? "Salvando..." : submitLabel}</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
