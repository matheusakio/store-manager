import type { StoreId } from "@/features/stores/types/school.types";

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
  imageUri?: string | undefined;
  createdAt: string;
};

export type CreateProductInput = {
  storeId: StoreId;
  name: string;
  category: ProductCategory;
  price: number;
  imageUri?: string | undefined;
};

export type UpdateProductInput = {
  name: string;
  category: ProductCategory;
  price: number;
  imageUri?: string | undefined;
};
