import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ImageIcon, Trash2 } from "lucide-react-native";

import { theme } from "@/theme";
import { pickImageFromLibrary } from "@/lib/image-picker";

type ImagePickerFieldProps = {
  label: string;
  value?: string | undefined;
  onChange: (value: string) => void;
  onClear: () => void;
  error?: string | undefined;
};

export function ImagePickerField({
  label,
  value,
  onChange,
  onClear,
  error,
}: ImagePickerFieldProps) {
  async function handlePickImage() {
    const result = await pickImageFromLibrary();

    if (!result.canceled && result.uri) {
      onChange(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {value ? (
        <View style={styles.previewCard}>
          <Image
            source={{ uri: value }}
            style={styles.previewImage}
            contentFit="cover"
            transition={200}
          />

          <View style={styles.actionsRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlePickImage}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Trocar imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onClear}
              style={styles.dangerButton}
            >
              <Trash2 size={16} color={theme.colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePickImage}
          style={styles.emptyPicker}
        >
          <ImageIcon size={22} color={theme.colors.textSecondary} />
          <Text style={styles.emptyPickerTitle}>Selecionar imagem</Text>
          <Text style={styles.emptyPickerDescription}>
            Adicione uma foto do produto pela galeria
          </Text>
        </TouchableOpacity>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  previewCard: {
    gap: theme.spacing.md,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceAlt,
  },
  actionsRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  dangerButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.dangerSoft,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyPicker: {
    minHeight: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  emptyPickerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },
  emptyPickerDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  error: {
    fontSize: 12,
    color: theme.colors.danger,
  },
});
