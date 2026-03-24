import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/features/products/types/product.types";

export const storeSchema = z.object({
  name: z.string().min(2, "Informe o nome da loja").trim(),
  address: z.string().min(5, "Informe o endereço").trim(),
});

export type StoreFormValues = z.infer<typeof storeSchema>;

const productCategoryInputSchema = z
  .union([z.enum(PRODUCT_CATEGORIES), z.literal("")])
  .refine((value) => value !== "", {
    message: "Selecione uma categoria",
  });

const productPriceInputSchema = z
  .string()
  .trim()
  .min(1, "Informe um preço válido")
  .transform((value) => Number(value.replace(",", ".")))
  .refine((value) => !Number.isNaN(value) && value > 0, {
    message: "Informe um preço válido",
  });

export const productSchema = z.object({
  name: z.string().min(2, "Informe o nome do produto").trim(),
  category: productCategoryInputSchema,
  price: productPriceInputSchema,
  imageUri: z.string().trim().optional(),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;
