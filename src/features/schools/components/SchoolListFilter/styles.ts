import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.textSecondary,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
