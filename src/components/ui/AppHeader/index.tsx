import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { theme } from "@/theme";
import { styles } from "./styles";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
};

export function AppHeader({
  title,
  subtitle,
  showBackButton = false,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={22} color={theme.colors.text} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
