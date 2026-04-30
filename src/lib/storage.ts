const memoryStorage: Record<string, string> = {};

export const storage = {
  async getItem(key: string): Promise<string | null> {
    return memoryStorage[key] ?? null;
  },

  async setItem(key: string, value: string): Promise<void> {
    memoryStorage[key] = value;
  },

  async removeItem(key: string): Promise<void> {
    delete memoryStorage[key];
  },
};