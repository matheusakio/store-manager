import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@gluestack-ui/themed";

export function AppScreen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$backgroundLight0" px="$4" py="$4">
        {children}
      </Box>
    </SafeAreaView>
  );
}
