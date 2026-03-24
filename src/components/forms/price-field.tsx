import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "@/theme";
import { formatBRLFromDigits } from "@/lib/currency";

type PriceFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string | undefined;
};

export function PriceField({
  label,
  value,
  onChangeText,
  placeholder = "R$ 0,00",
  error,
}: PriceFieldProps) {
  function handleChange(text: string) {
    const formatted = formatBRLFromDigits(text);
    onChangeText(formatted);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        keyboardType="number-pad"
        style={[styles.input, error ? styles.inputError : null]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  error: {
    fontSize: 12,
    color: theme.colors.danger,
  },
});
