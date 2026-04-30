import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xxl,
    ...theme.shadow.hero,
  },
  content: {
    gap: theme.spacing.sm,
  },
  eyebrow: {
    fontSize: theme.fonts.size.xs,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primarySoft,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: theme.fonts.size.xxxxl,
    fontWeight: theme.fonts.weight.extrabold,
    color: theme.colors.textOnPrimary,
    lineHeight: 30,
  },
  description: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.textOnDark,
    lineHeight: 20,
  },
});
