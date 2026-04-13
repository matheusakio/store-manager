import type { Product } from "@/features/classes/types/class.types";
import type {
  Store,
  StoreWithProductsCount,
} from "@/features/schools/types/school.types";

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
