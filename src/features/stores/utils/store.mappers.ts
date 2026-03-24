import type { Product } from "@/features/products/types/product.types";
import type {
  Store,
  StoreWithProductsCount,
} from "@/features/stores/types/store.types";

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
