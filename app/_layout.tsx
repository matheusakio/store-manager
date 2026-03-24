import { Stack } from "expo-router";

import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { makeServer } from "@/services/api/mock-server";

if (__DEV__) {
  makeServer();
}

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
