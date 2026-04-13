import { Stack } from "expo-router";
import { AlertNotificationRoot } from "react-native-alert-notification";

import "../../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { makeServer } from "@/services/api/mock-server";

makeServer();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <AlertNotificationRoot>
        <Stack screenOptions={{ headerShown: false }} />
      </AlertNotificationRoot>
    </GluestackUIProvider>
  );
}
