import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";

import { showError, showSuccess } from "@/components/feedback/app-alert";
import { ProductForm } from "@/features/products/components/product-form";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import { useProducts } from "@/features/products/hooks/use-products";

import type { ProductFormValues } from "@/lib/validations";
import { numberToBRLInput } from "@/lib/currency";
import { theme } from "@/theme";

export default function EditProductScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    storeId: string;
    productId: string;
  }>();

  const storeId = String(params.storeId);
  const productId = String(params.productId);

  const { products, isLoading, error, refetch } = useProducts(storeId);
  const { updateProduct } = useProductActions();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? null,
    [products, productId],
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

      showSuccess("Produto atualizado com sucesso.");

      router.replace(`/stores/${storeId}`);
    } catch {
      showError("Não foi possível atualizar o produto.");
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
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppHeader
          title="Editar produto"
          subtitle="Atualize os dados do item"
          showBackButton
        />

        <ProductForm
          defaultValues={{
            name: product.name,
            category: product.category,
            price: numberToBRLInput(product.price),
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
    gap: theme.spacing.xl,
  },
});
