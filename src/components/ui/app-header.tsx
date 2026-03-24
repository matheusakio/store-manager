import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { theme } from "@/theme";

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
          <ChevronLeft size={20} color={theme.colors.text} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.card,
  },
  textContainer: {
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
