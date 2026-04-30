import { ScrollView, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type ChipOption<T> = {
  label: string;
  value: T;
};

type ChipFilterProps<T> = {
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function ChipFilter<T extends string>({
  options,
  value,
  onChange,
}: ChipFilterProps<T>) {
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
