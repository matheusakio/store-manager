import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { CLASS_SHIFTS, ClassShift } from "../../types/class.types";

type ShiftSelectProps = {
  value: ClassShift | "";
  onChange: (value: ClassShift) => void;
  error?: string | undefined;
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
