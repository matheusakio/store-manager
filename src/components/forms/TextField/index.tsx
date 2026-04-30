import { Text, View } from "react-native";

import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
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
    <VStack space="xs">
      <Text className="text-sm font-semibold text-typography-900">{label}</Text>
      <Input variant="outline" size="md" isInvalid={!!error}>
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
      </Input>
      {error ? (
        <Text className="text-xs text-error-600">{error}</Text>
      ) : null}
    </VStack>
  );
}
