import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { showError, showSuccess } from "@/components/feedback/app-alert";
import { ProductForm } from "@/features/products/components/product-form";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import type { ProductFormValues } from "@/lib/validations";
import { theme } from "@/theme";

export default function NewProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const storeId = String(params.storeId);

  const { createProduct } = useProductActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateProduct(values: ProductFormValues) {
    try {
      setIsSubmitting(true);

      await createProduct({
        storeId,
        name: values.name,
        category: values.category,
        price: values.price,
        ...(values.imageUri ? { imageUri: values.imageUri } : {}),
      });

      showSuccess("Produto criado com sucesso.");
      router.replace(`/stores/${storeId}`);
    } catch {
      showError("Não foi possível criar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Novo produto"
          subtitle="Cadastre um item para esta loja"
          showBackButton
        />

        <ProductForm
          onSubmit={handleCreateProduct}
          isSubmitting={isSubmitting}
          submitLabel="Criar produto"
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
