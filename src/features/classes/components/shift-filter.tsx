import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CLASS_SHIFTS, type ClassShift } from "../types/class.types";

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
