import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.lg,
    ...theme.shadow.card,
  },

  content: {
    gap: theme.spacing.md,
  },

  name: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.extrabold,
    color: theme.colors.text,
  },

  metaRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    gap: 6,
    backgroundColor: theme.colors.primarySoft,
  },

  badgeText: {
    fontSize: theme.fonts.size.xs,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },

  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },

  actionButton: {
    flex: 1,
    height: 42,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.spacing.sm,
  },

  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
  },

  actionText: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.text,
  },

  deleteText: {
    color: theme.colors.danger,
  },
});
