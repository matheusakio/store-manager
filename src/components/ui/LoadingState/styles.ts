import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.spacing.xxxl,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: theme.radius.xxl,
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    ...theme.shadow.hero,
  },
  spinnerWrapper: {
    width: 68,
    height: 68,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fonts.size.xxxl,
    fontWeight: theme.fonts.weight.extrabold,
    color: theme.colors.textOnPrimary,
    textAlign: "center",
  },
  description: {
    fontSize: theme.fonts.size.md,
    lineHeight: 20,
    color: theme.colors.textOnDark,
    textAlign: "center",
  },
});
