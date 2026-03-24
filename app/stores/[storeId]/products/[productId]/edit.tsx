import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductForm } from "@/features/products/components/product-form";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import { useProducts } from "@/features/products/hooks/use-products";
import type { ProductFormValues } from "@/lib/validations";

export default function EditProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    storeId: string;
    productId: string;
  }>();

  const storeId = String(params.storeId);
  const productId = String(params.productId);

  const { products, isLoading, error } = useProducts(storeId);
  const { updateProduct } = useProductActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? null,
    [productId, products],
  );

  async function handleUpdateProduct(values: ProductFormValues) {
    try {
      setIsSubmitting(true);

      await updateProduct(productId, {
        name: values.name,
        category: values.category,
        price: values.price,
        ...(values.imageUri ? { imageUri: values.imageUri } : {}),
      });

      router.replace(`/stores/${storeId}`);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  }
  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Carregando produto..." />
      </AppScreen>
    );
  }

  if (error || !product) {
    return (
      <AppScreen>
        <ErrorState
          message={error ?? "Produto não encontrado."}
          onRetry={() => router.replace(`/stores/${storeId}`)}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader
          title="Editar produto"
          subtitle="Atualize os dados do item"
        />

        <ProductForm
          defaultValues={{
            name: product.name,
            category: product.category,
            price: product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            imageUri: product.imageUri ?? "",
          }}
          onSubmit={handleUpdateProduct}
          isSubmitting={isSubmitting}
          submitLabel="Salvar alterações"
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
