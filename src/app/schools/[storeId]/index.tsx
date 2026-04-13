import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SearchInput } from "@/components/ui/search-input";

import { CategoryFilter } from "@/features/classes/components/category-filter";
import { ProductCard } from "@/features/classes/components/product-card";
import { useProductActions } from "@/features/classes/hooks/use-product-actions";
import { useProducts } from "@/features/classes/hooks/use-products";
import { useStores } from "@/features/schools/hooks/use-stores";
import { useAppStore } from "@/store/app-store";
import { theme } from "@/theme";

export default function StoreDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storeId: string }>();
  const storeId = String(params.storeId);

  const { products = [], isLoading, error, refetch } = useProducts(storeId);
  const { getStoreById, isLoading: isLoadingStore } = useStores();
  const { deleteProduct } = useProductActions();

  const productSearch = useAppStore((state) => state.productSearch);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setProductSearch = useAppStore((state) => state.setProductSearch);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  const store = useMemo(() => getStoreById(storeId), [getStoreById, storeId]);

  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
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
    await deleteProduct(productId);
    await refetch();
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

            <PrimaryButton
              label="Cadastrar novo produto"
              onPress={() => router.push(`/stores/${storeId}/products/new`)}
            />
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
