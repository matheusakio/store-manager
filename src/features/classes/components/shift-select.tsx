import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CLASS_SHIFTS, type ClassShift } from "../types/class.types";

type ShiftSelectProps = {
  value: ClassShift | "";
  onChange: (value: ClassShift) => void;
  error?: string;
};

export function ShiftSelect({ value, onChange, error }: ShiftSelectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Turno</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {CLASS_SHIFTS.map((shift) => {
          const isActive = shift === value;

          return (
            <TouchableOpacity
              key={shift}
              activeOpacity={0.9}
              onPress={() => onChange(shift)}
              style={[styles.chip, isActive ? styles.chipActive : null]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.chipTextActive : null,
                ]}
              >
                {shift}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  content: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    height: 38,
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
  error: {
    fontSize: 12,
    color: "#DC2626",
  },
});
