import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    ...theme.shadow.card,
  },
  content: {
    gap: theme.spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  headerText: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fonts.size.xxl,
    fontWeight: theme.fonts.weight.extrabold,
    color: theme.colors.text,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  address: {
    flex: 1,
    fontSize: theme.fonts.size.md,
    color: theme.colors.textSecondary,
  },
  chevronWrapper: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  classesBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
  },
  classesText: {
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },
  linkText: {
    fontSize: theme.fonts.size.md,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.dangerSoft,
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
