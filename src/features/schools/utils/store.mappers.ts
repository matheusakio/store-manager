import type { Product } from "@/features/classes/types/product.types";
import type {
  Store,
  StoreWithProductsCount,
} from "@/features/schools/types/store.types";

export function mapStoresWithProductsCount(
  stores: Store[] = [],
  products: Product[] = [],
): StoreWithProductsCount[] {
  return stores.map((store) => ({
    ...store,
    productsCount: products.filter((product) => product.storeId === store.id)
      .length,
  }));
}
