import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  SCHOOLS: "@schools",
  CLASSES: "@classes",
} as const;

export const storage = {
  async getSchools<T>(): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SCHOOLS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting schools from storage:", error);
      return null;
    }
  },

  async setSchools<T>(data: T): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving schools to storage:", error);
    }
  },

  async getClasses<T>(schoolId: string): Promise<T | null> {
    try {
      const key = `${STORAGE_KEYS.CLASSES}_${schoolId}`;
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting classes from storage:", error);
      return null;
    }
  },

  async setClasses<T>(schoolId: string, data: T): Promise<void> {
    try {
      const key = `${STORAGE_KEYS.CLASSES}_${schoolId}`;
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving classes to storage:", error);
    }
  },

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter((key) =>
        key.startsWith("@schools") || key.startsWith("@classes")
      );
      for (const key of appKeys) {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
