import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductForm } from "@/features/products/components/product-form";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import type { ProductFormValues } from "@/lib/validations";

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

      router.replace(`/stores/${storeId}`);
    } catch {
      Alert.alert("Erro", "Não foi possível criar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader
          title="Novo produto"
          subtitle="Cadastre um item para esta loja"
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
    gap: 20,
  },
});
