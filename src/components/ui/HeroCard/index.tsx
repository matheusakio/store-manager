import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";
import { styles } from "./styles";

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
