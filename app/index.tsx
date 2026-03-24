import { VStack, Text } from "@gluestack-ui/themed";
import { AppScreen } from "@/components/ui/app-screen";

export default function HomeScreen() {
  return (
    <AppScreen>
      <VStack space="md">
        <Text size="2xl" fontWeight="$bold">
          Lojas
        </Text>

        <Text color="$textLight500">
          Gerencie filiais e acompanhe os produtos cadastrados.
        </Text>
      </VStack>
    </AppScreen>
  );
}
