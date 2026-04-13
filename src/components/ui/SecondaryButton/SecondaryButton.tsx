import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { theme } from "@/theme";

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function SecondaryButton({
  label,
  onPress,
  style,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
