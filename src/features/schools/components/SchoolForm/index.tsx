import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/TextField";
import { schoolFormSchema, type SchoolFormValues } from "@/lib/validations";

import { styles } from "./styles";

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
    resolver: zodResolver(schoolFormSchema),
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
            label="Nome da escola"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Escola Municipal Centro"
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
            placeholder="Ex: Centro - Goiânia"
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
