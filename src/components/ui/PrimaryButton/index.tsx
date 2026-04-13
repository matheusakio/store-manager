import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";
import { styles } from "./styles";

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
