import { TextInput, View } from "react-native";
import { Search } from "lucide-react-native";
import { styles } from "./styles";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Search size={18} color="#64748B" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />
    </View>
  );
}
