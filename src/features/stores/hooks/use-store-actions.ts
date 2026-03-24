import { storesRepository } from "../services/stores.repository";
import type { CreateStoreInput, UpdateStoreInput } from "../types/store.types";

export function useStoreActions() {
  async function createStore(input: CreateStoreInput) {
    return storesRepository.create(input);
  }

  async function updateStore(id: string, input: UpdateStoreInput) {
    return storesRepository.update(id, input);
  }

  async function deleteStore(id: string) {
    return storesRepository.remove(id);
  }

  return {
    createStore,
    updateStore,
    deleteStore,
  };
}
