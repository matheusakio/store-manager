import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.card,
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
});
