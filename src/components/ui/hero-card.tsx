import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";

type HeroCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function HeroCard({ eyebrow, title, description }: HeroCardProps) {
  return (
    <LinearGradient
      colors={[...theme.gradients.hero]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.xxl,
    ...theme.shadow.hero,
  },
  content: {
    gap: theme.spacing.sm,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: "#CCFBF1",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
});
