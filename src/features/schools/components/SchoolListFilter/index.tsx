import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { SchoolListFilter as SchoolListFilterValue } from "../../store/schools-ui.store";

type SchoolListFilterProps = {
  value: SchoolListFilterValue;
  onChange: (value: SchoolListFilterValue) => void;
};

const options: Array<{ label: string; value: SchoolListFilterValue }> = [
  { label: "Todas", value: "all" },
  { label: "Com turmas", value: "with-classes" },
  { label: "Sem turmas", value: "empty" },
];

export function SchoolListFilter({ value, onChange }: SchoolListFilterProps) {
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
            style={[styles.chip, isActive ? styles.chipActive : null]}
          >
            <Text
              style={[styles.chipText, isActive ? styles.chipTextActive : null]}
            >
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
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
