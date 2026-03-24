import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, style }: PrimaryButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.92} onPress={onPress} style={style}>
      <LinearGradient
        colors={theme.gradients.darkCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
