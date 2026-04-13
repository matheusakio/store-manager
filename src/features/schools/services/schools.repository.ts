import { api } from "@/services/api/client";
import {
  CreateStoreInput,
  Store,
  UpdateStoreInput,
} from "../types/school.types";

export const storesRepository = {
  list: async (): Promise<Store[]> => {
    const response = await api.get<{ stores: Store[] }>("/stores");
    return response.stores;
  },

  create: async (input: CreateStoreInput): Promise<Store> => {
    return api.post("/stores", input);
  },

  update: async (id: string, input: UpdateStoreInput): Promise<Store> => {
    return api.put(`/stores/${id}`, input);
  },

  remove: async (id: string) => {
    return api.delete(`/stores/${id}`);
  },
};
