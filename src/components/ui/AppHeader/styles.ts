import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.card,
  },
  textContainer: {
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
});
