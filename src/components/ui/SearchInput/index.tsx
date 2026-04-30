import { Search } from "lucide-react-native";
import { Input, InputField, InputIcon } from "@/components/ui/input";

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
  <Input variant="outline" size="md" className="px-3 items-center">
    <InputIcon as={Search} className="text-typography-400" />
    <InputField
      className="flex-1"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
    />
  </Input>
  );
}
