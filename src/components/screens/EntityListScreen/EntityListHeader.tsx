import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { AppHeader } from "@/components/ui/AppHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { theme } from "@/theme";

type EntityListHeaderProps = {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  onNewPress: () => void;
  newButtonLabel: string;
  showBackButton?: boolean;
  filterComponent?: ReactNode;
};

export function EntityListHeader({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  onNewPress,
  newButtonLabel,
  showBackButton,
  filterComponent,
}: EntityListHeaderProps) {
  return (
    <View style={styles.container}>
      <AppHeader
        title={title}
        subtitle={subtitle}
        showBackButton={showBackButton ?? false}
      />

      <SearchInput
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder={searchPlaceholder}
      />

      {filterComponent}

      <PrimaryButton label={newButtonLabel} onPress={onNewPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
});
