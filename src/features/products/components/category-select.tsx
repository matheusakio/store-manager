import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "../types/product.types";

type CategorySelectProps = {
  value: ProductCategory | "";
  onChange: (value: ProductCategory) => void;
  error?: string | undefined;
};

export function CategorySelect({
  value,
  onChange,
  error,
}: CategorySelectProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {PRODUCT_CATEGORIES.map((category) => {
          const isActive = category === value;

          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.9}
              onPress={() => onChange(category)}
              style={[styles.chip, isActive ? styles.chipActive : null]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.chipTextActive : null,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  content: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  error: {
    fontSize: 12,
    color: "#DC2626",
  },
});
