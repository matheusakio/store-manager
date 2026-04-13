import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

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
