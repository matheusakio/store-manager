import * as ImagePicker from "expo-image-picker";

export async function pickImageFromLibrary() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return {
      canceled: true,
      uri: null,
    };
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
    selectionLimit: 1,
  });

  if (result.canceled) {
    return {
      canceled: true,
      uri: null,
    };
  }

  const asset = result.assets?.[0];

  if (!asset?.uri) {
    return {
      canceled: true,
      uri: null,
    };
  }

  return {
    canceled: false,
    uri: asset.uri,
  };
}
