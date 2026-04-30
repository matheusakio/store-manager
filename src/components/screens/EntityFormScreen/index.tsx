import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppHeader } from "@/components/ui/AppHeader";
import { AppScreen } from "@/components/ui/AppScreen";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { theme } from "@/theme";

type EntityFormScreenProps = {
  title: string;
  subtitle: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: ReactNode;
};

export function EntityFormScreen({
  title,
  subtitle,
  isLoading,
  error,
  onRetry,
  children,
}: EntityFormScreenProps) {
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
      <View style={styles.container}>
        <AppHeader title={title} subtitle={subtitle} showBackButton />
        {children}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
});
