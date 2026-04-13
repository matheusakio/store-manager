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
    fontSize: 18,
    fontWeight: "800",
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    gap: 6,
    backgroundColor: theme.colors.primarySoft,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
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
    gap: 8,
  },

  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },

  deleteText: {
    color: theme.colors.danger,
  },
});
