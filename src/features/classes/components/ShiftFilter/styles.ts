import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
