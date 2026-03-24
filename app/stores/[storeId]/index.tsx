import { useMemo } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button, ButtonText } from "@/components/ui/button";
import { AppScreen } from "@/components/ui/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchInput } from "@/components/ui/search-input";
import { SectionHeader } from "@/components/ui/section-header";

import { CategoryFilter } from "@/features/products/components/category-filter";
import { ProductCard } from "@/features/products/components/product-card";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import { useProducts } from "@/features/products/hooks/use-products";
import { useStores } from "@/features/stores/hooks/use-stores";
import { useAppStore } from "@/store/app-store";

export default function StoreDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const storeId = String(params.storeId);

  const { products, isLoading, error, refetch } = useProducts(storeId);
  const { getStoreById, isLoading: isLoadingStore } = useStores();
  const { deleteProduct } = useProductActions();

  const productSearch = useAppStore((state) => state.productSearch);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setProductSearch = useAppStore((state) => state.setProductSearch);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  const store = useMemo(() => getStoreById(storeId), [getStoreById, storeId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = productSearch.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [productSearch, products, selectedCategory]);

  async function handleDeleteProduct(productId: string) {
    try {
      await deleteProduct(productId);
      await refetch();
    } catch {
      Alert.alert("Erro", "Não foi possível excluir o produto.");
    }
  }

  if (isLoading || isLoadingStore) {
    return (
      <AppScreen>
        <LoadingState label="Carregando produtos..." />
      </AppScreen>
    );
  }

  if (error || !store) {
    return (
      <AppScreen>
        <ErrorState
          message={error ?? "Loja não encontrada."}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader title={store.name} subtitle={store.address} />

        <SearchInput
          value={productSearch}
          onChangeText={setProductSearch}
          placeholder="Buscar produto ou categoria"
        />

        <CategoryFilter
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <Button onPress={() => router.push(`/stores/${storeId}/products/new`)}>
          <ButtonText>Novo produto</ButtonText>
        </Button>

        <View style={styles.content}>
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Nenhum produto encontrado"
              description="Cadastre um produto ou ajuste os filtros."
            />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.list}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() =>
                      router.push(
                        `/stores/${storeId}/products/${product.id}/edit`,
                      )
                    }
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  list: {
    gap: 12,
  },
});
