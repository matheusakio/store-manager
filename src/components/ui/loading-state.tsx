import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.spacing.xxxl,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: theme.radius.xxl,
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    ...theme.shadow.hero,
  },
  spinnerWrapper: {
    width: 68,
    height: 68,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.78)",
    textAlign: "center",
  },
});
