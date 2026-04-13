import { storesRepository } from "../services/schools.repository";
import { UpdateStoreInput } from "../types/school.types";
import { CreateStoreInput } from "../types/school.types";

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
