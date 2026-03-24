import { useMemo } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/app-screen";
import { AppHeader } from "@/components/ui/app-header";
import { HeroCard } from "@/components/ui/hero-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchInput } from "@/components/ui/search-input";
import { Button, ButtonText } from "@/components/ui/button";

import { StoreCard } from "@/features/stores/components/store-card";
import { useStoreActions } from "@/features/stores/hooks/use-store-actions";
import { useStores } from "@/features/stores/hooks/use-stores";
import type { StoreWithProductsCount } from "@/features/stores/types/store.types";
import { useAppStore } from "@/store/app-store";
import { theme } from "@/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { stores, isLoading, error, refetch } = useStores();
  const { deleteStore } = useStoreActions();

  const storeSearch = useAppStore((state) => state.storeSearch);
  const setStoreSearch = useAppStore((state) => state.setStoreSearch);

  const storesWithCount = useMemo<StoreWithProductsCount[]>(
    () =>
      stores.map((store) => ({
        ...store,
        productsCount: 0,
      })),
    [stores],
  );

  const filteredStores = useMemo(() => {
    const query = storeSearch.trim().toLowerCase();

    if (!query) return storesWithCount;

    return storesWithCount.filter(
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query),
    );
  }, [storeSearch, storesWithCount]);

  async function handleDeleteStore(storeId: string) {
    try {
      await deleteStore(storeId);
      await refetch();
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a loja.");
    }
  }

  if (isLoading) {
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
              subtitle={`${filteredStores.length} unidades cadastradas`}
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

            <Button onPress={() => router.push("/stores/new")}>
              <ButtonText>Nova loja</ButtonText>
            </Button>
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
