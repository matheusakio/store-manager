import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "@/theme";

type StoreListFilterValue = "all" | "with-products" | "empty";

type StoreListFilterProps = {
  value: StoreListFilterValue;
  onChange: (value: StoreListFilterValue) => void;
};

const options: Array<{ label: string; value: StoreListFilterValue }> = [
  { label: "Todas", value: "all" },
  { label: "Com produtos", value: "with-products" },
  { label: "Sem produtos", value: "empty" },
];

export function StoreListFilter({ value, onChange }: StoreListFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.9}
            onPress={() => onChange(option.value)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.textSecondary,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
