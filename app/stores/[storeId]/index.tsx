import { useMemo } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppHeader } from "@/components/ui/app-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchInput } from "@/components/ui/search-input";
import { Button, ButtonText } from "@/components/ui/button";

import { CategoryFilter } from "@/features/products/components/category-filter";
import { ProductCard } from "@/features/products/components/product-card";
import { useProductActions } from "@/features/products/hooks/use-product-actions";
import { useProducts } from "@/features/products/hooks/use-products";
import { useStores } from "@/features/stores/hooks/use-stores";
import { useAppStore } from "@/store/app-store";
import { theme } from "@/theme";

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
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AppHeader
              title={store.name}
              subtitle={store.address}
              showBackButton
            />

            <SearchInput
              value={productSearch}
              onChangeText={setProductSearch}
              placeholder="Buscar produto ou categoria"
            />

            <CategoryFilter
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            <Button
              onPress={() => router.push(`/stores/${storeId}/products/new`)}
            >
              <ButtonText>Novo produto</ButtonText>
            </Button>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Nenhum produto encontrado"
            description="Cadastre um produto ou ajuste os filtros."
          />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={() =>
              router.push(`/stores/${storeId}/products/${item.id}/edit`)
            }
            onDelete={() => handleDeleteProduct(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  headerContent: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  separator: {
    height: theme.spacing.md,
  },
});
