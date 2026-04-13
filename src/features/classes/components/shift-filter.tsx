import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "../types/class.types";

type CategoryFilterValue = ProductCategory | "Todos";

type CategoryFilterProps = {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
};

const options: CategoryFilterValue[] = ["Todos", ...PRODUCT_CATEGORIES];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isActive = option === value;

        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.9}
            onPress={() => onChange(option)}
            style={[styles.chip, isActive ? styles.chipActive : null]}
          >
            <Text
              style={[styles.chipText, isActive ? styles.chipTextActive : null]}
            >
              {option}
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
