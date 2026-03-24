import { Alert } from "react-native";

export const appToast = {
  success(title: string, message?: string) {
    Alert.alert(title, message);
  },
  error(title: string, message?: string) {
    Alert.alert(title, message);
  },
};
