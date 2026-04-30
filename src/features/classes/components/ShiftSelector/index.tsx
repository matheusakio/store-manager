import { StyleSheet, Text, View } from "react-native";

import { ChipFilter } from "@/components/ui/ChipFilter";
import { theme } from "@/theme";
import { CLASS_SHIFTS, ClassShift } from "../../types/class.types";

type ShiftSelectorProps = {
  value: ClassShift | "" | "Todos";
  onChange: (value: ClassShift | "Todos") => void;
  includeAllOption?: boolean;
  label?: string;
  error?: string | undefined;
};

export function ShiftSelector({
  value,
  onChange,
  includeAllOption = false,
  label,
  error,
}: ShiftSelectorProps) {
  const options = includeAllOption
    ? ["Todos" as const, ...CLASS_SHIFTS]
    : CLASS_SHIFTS;

  const chipOptions = options.map((opt) => ({ label: opt, value: opt }));

  const content = (
    <ChipFilter
      options={chipOptions}
      value={value as ClassShift & "Todos"}
      onChange={onChange}
    />
  );

  if (!label && !error) {
    return content;
  }

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}
      {content}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text,
  },
  error: {
    fontSize: theme.fonts.size.xs,
    color: theme.colors.danger,
  },
});
