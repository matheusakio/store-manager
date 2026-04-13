import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/text-field";
import { PriceField } from "@/components/forms/price-field";
import { ImagePickerField } from "@/components/forms/image-picker-field";
import {
  productSchema,
  type SchoolClassFormInput,
  type SchoolClassFormValues,
} from "@/lib/validations";
import { CategorySelect } from "./shift-select";
import { theme } from "@/theme";

type SchoolClassFormProps = {
  defaultValues?: SchoolClassFormInput;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: SchoolClassFormValues) => Promise<void> | void;
};

export function SchoolClassForm({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Salvar",
  onSubmit,
}: SchoolClassFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolClassFormInput, unknown, SchoolClassFormValues>({
    resolver: zodResolver(productSchema),
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
            label="Nome do produto"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: Fone Bluetooth"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <CategorySelect
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
          <PriceField
            label="Preço"
            value={value}
            onChangeText={onChange}
            placeholder="299,90"
            error={errors.price?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="imageUri"
        render={({ field: { value, onChange } }) => (
          <ImagePickerField
            label="Imagem do produto"
            value={value}
            onChange={onChange}
            onClear={() => onChange("")}
            error={errors.imageUri?.message}
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
    gap: theme.spacing.lg,
  },
});
