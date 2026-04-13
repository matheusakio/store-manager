import { Text, TextInput, View } from "react-native";

import { styles } from "./styles";

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string | undefined;
  error?: string | undefined;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={[styles.input, error ? styles.inputError : null]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
