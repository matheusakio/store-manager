import type { StoreId } from "@/features/stores/types/store.types";

export const PRODUCT_CATEGORIES = [
  "Eletrônicos",
  "Roupas",
  "Alimentos",
  "Casa",
  "Beleza",
  "Outros",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductId = string;

export type Product = {
  id: ProductId;
  storeId: StoreId;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl?: string | null;
  createdAt: string;
};

export type CreateProductInput = {
  storeId: StoreId;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl?: string;
};

export type UpdateProductInput = Omit<CreateProductInput, "storeId">;
