import { ScrollView, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type SchoolListFilterValue = "all" | "with-products" | "empty";

type SchoolListFilterProps = {
  value: SchoolListFilterValue;
  onChange: (value: SchoolListFilterValue) => void;
};

const options: Array<{ label: string; value: SchoolListFilterValue }> = [
  { label: "Todas", value: "all" },
  { label: "Com produtos", value: "with-products" },
  { label: "Sem produtos", value: "empty" },
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
