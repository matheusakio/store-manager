import { Text, TouchableOpacity, View } from "react-native";
import {
  ChevronRight,
  MapPin,
  Package,
  Pencil,
  Trash2,
} from "lucide-react-native";

import { confirmDelete } from "@/components/feedback/app-alert";
import { theme } from "@/theme";

import { styles } from "./styles";
import { SchoolWithClassesCount } from "../../types/school.types";

type SchoolCardProps = {
  school: SchoolWithClassesCount;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function SchoolCard({
  school,
  onPress,
  onEdit,
  onDelete,
}: SchoolCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{school.name}</Text>

            <View style={styles.addressRow}>
              <MapPin size={15} color={theme.colors.textSecondary} />
              <Text style={styles.address}>{school.address}</Text>
            </View>
          </View>

          <View style={styles.chevronWrapper}>
            <ChevronRight size={18} color={theme.colors.textMuted} />
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.productsBadge}>
            <Package size={14} color={theme.colors.primary} />
            <Text style={styles.productsText}>
              {school.classesCount} turma
              {school.classesCount === 1 ? "" : "s"}
            </Text>
          </View>

          <Text style={styles.linkText}>Ver turmas</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onEdit}
            style={styles.actionButton}
          >
            <Pencil size={16} color={theme.colors.text} />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              confirmDelete(
                "Excluir escola",
                `Deseja excluir "${school.name}"?`,
                onDelete,
              )
            }
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Trash2 size={16} color={theme.colors.danger} />
            <Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
