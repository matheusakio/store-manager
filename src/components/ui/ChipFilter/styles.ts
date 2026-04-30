import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.lg,
  },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.chip.border,
    backgroundColor: theme.colors.chip.background,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: theme.colors.chip.activeBackground,
    borderColor: theme.colors.chip.activeBorder,
  },
  chipText: {
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.chip.text,
  },
  chipTextActive: {
    color: theme.colors.chip.activeText,
  },
});
