import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { AppScreen } from "@/components/ui/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { HeroCard } from "@/components/ui/hero-card";
import { LoadingState } from "@/components/ui/loading-state";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SearchInput } from "@/components/ui/search-input";
import { useAllProducts } from "@/features/classes/hooks/use-all-products";
import { StoreListFilter } from "@/features/schools/components/store-list-filter";
import { StoreCard } from "@/features/schools/components/store-card";
import { useStoreActions } from "@/features/schools/hooks/use-store-actions";
import { useStores } from "@/features/schools/hooks/use-stores";

import { mapStoresWithProductsCount } from "@/features/schools/utils/store.mappers";
import { useAppStore } from "@/store/app-store";
import { theme } from "@/theme";

export default function HomeScreen() {
  const router = useRouter();

  const {
    stores = [],
    isLoading: isLoadingStores,
    error,
    refetch,
  } = useStores();

  const { products = [], isLoading: isLoadingProducts } = useAllProducts();

  const { deleteStore } = useStoreActions();

  const storeSearch = useAppStore((state) => state.storeSearch);
  const setStoreSearch = useAppStore((state) => state.setStoreSearch);
  const storeListFilter = useAppStore((state) => state.storeListFilter);
  const setStoreListFilter = useAppStore((state) => state.setStoreListFilter);

  const storesWithCount = useMemo(() => {
    return mapStoresWithProductsCount(stores ?? [], products ?? []);
  }, [stores, products]);

  const filteredStores = useMemo(() => {
    const query = storeSearch.trim().toLowerCase();

    return storesWithCount.filter((store) => {
      const matchesSearch =
        !query ||
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query);

      const matchesFilter =
        storeListFilter === "all" ||
        (storeListFilter === "with-products" && store.productsCount > 0) ||
        (storeListFilter === "empty" && store.productsCount === 0);

      return matchesSearch && matchesFilter;
    });
  }, [storeSearch, storeListFilter, storesWithCount]);

  async function handleDeleteStore(storeId: string) {
    await deleteStore(storeId);
    await refetch();
  }

  if (isLoadingStores || isLoadingProducts) {
    return (
      <AppScreen>
        <LoadingState label="Carregando lojas..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ErrorState message={error} onRetry={refetch} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <AppHeader
              title="Lojas"
              subtitle={`${filteredStores.length} unidades visíveis`}
            />

            <HeroCard
              eyebrow="Painel central"
              title="Gerencie lojas e produtos com mais clareza"
              description="Cadastre unidades, organize o catálogo e acompanhe os itens de cada loja em um só lugar."
            />

            <SearchInput
              value={storeSearch}
              onChangeText={setStoreSearch}
              placeholder="Buscar por nome ou endereço"
            />

            <StoreListFilter
              value={storeListFilter}
              onChange={setStoreListFilter}
            />

            <PrimaryButton
              label="Cadastrar nova loja"
              onPress={() => router.push("/stores/new")}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma loja encontrada"
            description="Cadastre sua primeira loja ou ajuste sua busca."
          />
        }
        renderItem={({ item }) => (
          <StoreCard
            store={item}
            onPress={() => router.push(`/stores/${item.id}`)}
            onEdit={() => router.push(`/stores/${item.id}/edit`)}
            onDelete={() => handleDeleteStore(item.id)}
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
