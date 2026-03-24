import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ChevronRight,
  MapPin,
  Package,
  Pencil,
  Trash2,
} from "lucide-react-native";

import { confirmDelete } from "@/components/feedback/app-alert";
import { theme } from "@/theme";
import type { StoreWithProductsCount } from "../types/store.types";

type StoreCardProps = {
  store: StoreWithProductsCount;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function StoreCard({
  store,
  onPress,
  onEdit,
  onDelete,
}: StoreCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{store.name}</Text>

            <View style={styles.addressRow}>
              <MapPin size={15} color={theme.colors.textSecondary} />
              <Text style={styles.address}>{store.address}</Text>
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
              {store.productsCount} produto
              {store.productsCount === 1 ? "" : "s"}
            </Text>
          </View>

          <Text style={styles.linkText}>Ver produtos</Text>
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
                "Excluir loja",
                `Deseja excluir "${store.name}"?`,
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    ...theme.shadow.card,
  },
  content: {
    gap: theme.spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  headerText: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  chevronWrapper: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  productsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
  },
  productsText: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: theme.colors.dangerSoft,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },
  deleteText: {
    color: theme.colors.danger,
  },
});
