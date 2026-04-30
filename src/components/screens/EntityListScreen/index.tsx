export { EntityListHeader } from "./EntityListHeader";

import { ComponentType, ReactElement } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { theme } from "@/theme";

type EntityListScreenProps<T> = {
  data: T[];
  isLoading: boolean;
  error?: string | null;
  onRetry?: (() => void) | undefined;
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  ListHeaderComponent?: ComponentType<any> | ReactElement | null;
  ListEmptyComponent?: ComponentType<any> | ReactElement | null;
};

export function EntityListScreen<T>({
  data,
  isLoading,
  error,
  onRetry,
  keyExtractor,
  renderItem,
  ListHeaderComponent,
  ListEmptyComponent,
}: EntityListScreenProps<T>) {
  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Carregando..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ErrorState message={error} onRetry={onRetry ?? (() => {})} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  separator: {
    height: theme.spacing.md,
  },
});
