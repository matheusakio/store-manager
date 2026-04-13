import { Text, View } from "react-native";
import { PackageOpen } from "lucide-react-native";
import { styles } from "./styles";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.card}>
      <PackageOpen size={28} color="#64748B" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
