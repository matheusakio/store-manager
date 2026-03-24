import { Text, VStack } from "@gluestack-ui/themed";
import { AppScreen } from "@/components/ui/app-screen";
import { UI_TEXT } from "@/lib/constants";

export default function HomeScreen() {
  return (
    <AppScreen>
      <VStack space="md">
        <Text size="2xl" fontWeight="$bold">
          {UI_TEXT.storesTitle}
        </Text>

        <Text color="$textLight500">{UI_TEXT.storesSubtitle}</Text>
      </VStack>
    </AppScreen>
  );
}
