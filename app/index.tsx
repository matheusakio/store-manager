import { useMemo } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useRouter } from "expo-router";

import { Button, ButtonText } from "@/components/ui/button";
import { AppScreen } from "@/components/ui/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchInput } from "@/components/ui/search-input";
import { SectionHeader } from "@/components/ui/section-header";
import { StoreCard } from "@/features/stores/components/store-card";
import { useStoreActions } from "@/features/stores/hooks/use-store-actions";
import { useStores } from "@/features/stores/hooks/use-stores";
import type { StoreWithProductsCount } from "@/features/stores/types/store.types";
import { useAppStore } from "@/store/app-store";

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

  return (
    <AppScreen>
      <View style={styles.container}>
        <SectionHeader
          title="Lojas"
          subtitle={`${filteredStores.length} itens`}
        />

        <SearchInput
          value={storeSearch}
          onChangeText={setStoreSearch}
          placeholder="Buscar por nome ou endereço"
        />

        <Button onPress={() => router.push("/stores/new")}>
          <ButtonText>Nova loja</ButtonText>
        </Button>

        <View style={styles.content}>
          {isLoading ? (
            <LoadingState label="Carregando lojas..." />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : filteredStores.length === 0 ? (
            <EmptyState
              title="Nenhuma loja encontrada"
              description="Cadastre sua primeira loja ou ajuste sua busca."
            />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.list}>
                {filteredStores.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onPress={() => router.push(`/stores/${store.id}`)}
                    onEdit={() => router.push(`/stores/${store.id}/edit`)}
                    onDelete={() => handleDeleteStore(store.id)}
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
