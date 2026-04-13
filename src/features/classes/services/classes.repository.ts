import { api } from "@/services/api/client";
import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "../types/class.types";

export const productsRepository = {
  listByStore: async (storeId: string): Promise<Product[]> => {
    const response = await api.get<{ products: Product[] }>(
      `/products?storeId=${storeId}`,
    );

    return response.products;
  },

  create: async (input: CreateProductInput): Promise<Product> => {
    return api.post("/products", input);
  },

  update: async (id: string, input: UpdateProductInput): Promise<Product> => {
    return api.put(`/products/${id}`, input);
  },

  remove: async (id: string) => {
    return api.delete(`/products/${id}`);
  },
};
