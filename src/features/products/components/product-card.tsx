import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Pencil, Tag, Trash2, Image as ImageIcon } from "lucide-react-native";

import { theme } from "@/theme";
import type { Product } from "../types/product.types";
import { getCategoryAccent } from "../utils/product.mappers";
import { confirmDelete } from "@/components/feedback/app-alert";

type ProductCardProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const accent = getCategoryAccent(product.category);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {product.imageUri ? (
          <Image
            source={{ uri: product.imageUri }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View
            style={[
              styles.imageFallback,
              { backgroundColor: accent.background },
            ]}
          >
            <ImageIcon size={22} color={accent.text} />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>

          <View
            style={[styles.category, { backgroundColor: accent.background }]}
          >
            <Tag size={12} color={accent.text} />
            <Text style={[styles.categoryText, { color: accent.text }]}>
              {product.category}
            </Text>
          </View>

          <Text style={styles.price}>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
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
              "Excluir produto",
              "Deseja excluir este produto?",
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.lg,
    ...theme.shadow.card,
  },

  row: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.lg,
  },

  imageFallback: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    gap: theme.spacing.sm,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },

  category: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    gap: 6,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "700",
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.primary,
  },

  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },

  actionButton: {
    flex: 1,
    height: 42,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  deleteButton: {
    backgroundColor: theme.colors.dangerSoft,
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
