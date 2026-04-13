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
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.78)",
    textAlign: "center",
  },
});
