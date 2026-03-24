import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
  },
  message: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
