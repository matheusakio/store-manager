import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";
import { styles } from "./styles";

export function AppScreen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
}
