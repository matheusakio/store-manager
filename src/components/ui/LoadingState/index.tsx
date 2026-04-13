import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";
import { styles } from "./styles";

type LoadingStateProps = {
  label?: string;
  description?: string;
};

export function LoadingState({
  label = "Carregando...",
  description = "Aguarde um instante enquanto organizamos as informações.",
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradients.darkCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>

        <Text style={styles.title}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </View>
  );
}
