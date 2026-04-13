import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.card,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
