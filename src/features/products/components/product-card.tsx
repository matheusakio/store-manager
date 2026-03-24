import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pencil, Tag, Trash2 } from "lucide-react-native";
import type { Product } from "../types/product.types";

type ProductCardProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.categoryRow}>
            <Tag size={14} color="#64748B" />
            <Text style={styles.category}>{product.category}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Pencil size={16} color="#0F172A" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Trash2 size={16} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
  },
  content: {
    gap: 14,
  },
  header: {
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  category: {
    fontSize: 13,
    color: "#64748B",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F766E",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
});
