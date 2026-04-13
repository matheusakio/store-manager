import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { CLASS_SHIFTS, ClassShift } from "../../types/class.types";

type ShiftFilterValue = "Todos" | ClassShift;

type ShiftFilterProps = {
  value: ShiftFilterValue;
  onChange: (value: ShiftFilterValue) => void;
};

const options: ShiftFilterValue[] = ["Todos", ...CLASS_SHIFTS];

export function ShiftFilter({ value, onChange }: ShiftFilterProps) {
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
