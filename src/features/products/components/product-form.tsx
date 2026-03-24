import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/text-field";
import { PriceField } from "@/components/forms/price-field";
import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "@/lib/validations";
import { CategorySelect } from "./category-select";

type ProductFormProps = {
  defaultValues?: ProductFormInput;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
};

export function ProductForm({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Salvar",
  onSubmit,
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      category: "",
      price: "",
      imageUrl: "",
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
        name="imageUrl"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="URL da imagem (opcional)"
            value={value ?? ""}
            onChangeText={onChange}
            placeholder="https://..."
            error={errors.imageUrl?.message}
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
