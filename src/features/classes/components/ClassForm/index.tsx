import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/TextField";
import {
  classFormSchema,
  type ClassFormInput,
  type ProductFormValues,
} from "@/lib/validations";

import { styles } from "./styles";
import { ShiftSelect } from "../ShiftSelect";

type ClassFormProps = {
  defaultValues?: ClassFormInput;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
};

export function ClassForm({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Salvar",
  onSubmit,
}: ClassFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      category: "",
      price: "",
      imageUri: "",
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Nome da turma"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: 5º Ano A"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <ShiftSelect
            value={value}
            onChange={onChange}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Ano letivo"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: 2026"
            error={errors.price?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText>{isSubmitting ? "Salvando..." : submitLabel}</ButtonText>
      </Button>
    </View>
  );
}
