import { productsRepository } from "../services/products.repository";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../types/product.types";

export function useProductActions() {
  async function createProduct(input: CreateProductInput) {
    return productsRepository.create(input);
  }

  async function updateProduct(id: string, input: UpdateProductInput) {
    return productsRepository.update(id, input);
  }

  async function deleteProduct(id: string) {
    return productsRepository.remove(id);
  }

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
