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
    fontSize: 12,
    fontWeight: "700",
    color: "#CCFBF1",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
});
