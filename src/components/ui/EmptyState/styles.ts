import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xxl,
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
    textAlign: "center",
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
