import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xxxl,
    alignItems: "center",
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.danger,
  },
  message: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
