import AsyncStorage from "@react-native-async-storage/async-storage";

// Memory fallback for development when AsyncStorage native module is not available
const memoryStorage: Record<string, string> = {};

const memoryStorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    return memoryStorage[key] ?? null;
  },
  async setItem(key: string, value: string): Promise<void> {
    memoryStorage[key] = value;
  },
  async removeItem(key: string): Promise<void> {
    delete memoryStorage[key];
  },
  async getAllKeys(): Promise<string[]> {
    return Object.keys(memoryStorage);
  },
  async multiRemove(keys: string[]): Promise<void> {
    keys.forEach((key) => delete memoryStorage[key]);
  },
};

// Check if AsyncStorage native module is available
const isAsyncStorageAvailable = (): boolean => {
  try {
    // @ts-ignore - checking if native module exists
    return AsyncStorage?.getItem !== undefined;
  } catch {
    return false;
  }
};

export const storage = isAsyncStorageAvailable() ? AsyncStorage : memoryStorageAdapter;
