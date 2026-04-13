import { Text, TouchableOpacity, View } from "react-native";
import { Pencil, Trash2, Clock3, CalendarDays } from "lucide-react-native";

import { theme } from "@/theme";

import { confirmDelete } from "@/components/feedback/app-alert";
import { styles } from "./styles";
import { SchoolClass } from "../../types/class.types";

type ClassCardProps = {
  schoolClass: SchoolClass;
  onEdit: () => void;
  onDelete: () => void;
};

export function ClassCard({ schoolClass, onEdit, onDelete }: ClassCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{schoolClass.name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Clock3 size={14} color={theme.colors.primary} />
            <Text style={styles.badgeText}>{schoolClass.shift}</Text>
          </View>

          <View style={styles.badge}>
            <CalendarDays size={14} color={theme.colors.primary} />
            <Text style={styles.badgeText}>{schoolClass.schoolYear}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Pencil size={16} color={theme.colors.text} />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            confirmDelete(
              "Excluir turma",
              `Deseja excluir a turma "${schoolClass.name}"?`,
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
  );
}
