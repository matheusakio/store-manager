import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapPin, Package, Pencil, Trash2 } from "lucide-react-native";
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
  function handleDeletePress() {
    Alert.alert("Excluir loja", `Deseja excluir "${store.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: onDelete },
    ]);
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{store.name}</Text>

          <View style={styles.addressRow}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.address}>{store.address}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.productsRow}>
            <Package size={16} color="#0F766E" />
            <Text style={styles.productsText}>
              {store.productsCount} produto
              {store.productsCount === 1 ? "" : "s"}
            </Text>
          </View>

          <Text style={styles.linkText}>Ver produtos</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Pencil size={16} color="#0F172A" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeletePress}
            style={styles.actionButton}
          >
            <Trash2 size={16} color="#DC2626" />
            <Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
  },
  content: {
    gap: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: "#64748B",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  productsText: {
    fontSize: 14,
    color: "#475569",
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F766E",
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  deleteText: {
    color: "#DC2626",
  },
});
