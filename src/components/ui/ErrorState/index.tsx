import { Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { styles } from "./styles";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorreu um erro</Text>
      <Text style={styles.message}>{message}</Text>

      <Button onPress={onRetry}>
        <ButtonText>Tentar novamente</ButtonText>
      </Button>
    </View>
  );
}
