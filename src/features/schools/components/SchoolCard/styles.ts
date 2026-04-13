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
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
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
  productsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
  },
  productsText: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "700",
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
    gap: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.dangerSoft,
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
