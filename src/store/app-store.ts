import { create } from "zustand";
import type { ProductCategory } from "@/features/classes/types/class.types";

type StoreListFilter = "all" | "with-products" | "empty";

type AppState = {
  storeSearch: string;
  productSearch: string;
  storeListFilter: StoreListFilter;
  selectedCategory: ProductCategory | "Todos";

  setStoreSearch: (value: string) => void;
  setProductSearch: (value: string) => void;
  setStoreListFilter: (value: StoreListFilter) => void;
  setSelectedCategory: (value: ProductCategory | "Todos") => void;
  resetProductFilters: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  storeSearch: "",
  productSearch: "",
  storeListFilter: "all",
  selectedCategory: "Todos",

  setStoreSearch: (value) => set({ storeSearch: value }),
  setProductSearch: (value) => set({ productSearch: value }),
  setStoreListFilter: (value) => set({ storeListFilter: value }),
  setSelectedCategory: (value) => set({ selectedCategory: value }),
  resetProductFilters: () =>
    set({
      productSearch: "",
      selectedCategory: "Todos",
    }),
}));
