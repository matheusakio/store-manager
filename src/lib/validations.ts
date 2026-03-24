import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(2, "Informe o nome da loja").trim(),
  address: z.string().min(5, "Informe o endereço").trim(),
});

export type StoreFormValues = z.infer<typeof storeSchema>;
