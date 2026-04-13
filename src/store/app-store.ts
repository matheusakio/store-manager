import { create } from "zustand";
import type { ClassShift } from "@/features/classes/types/class.types";

type SchoolListFilter = "all" | "with-products" | "empty";

type AppState = {
  storeSearch: string;
  productSearch: string;
  storeListFilter: SchoolListFilter;
  selectedCategory: ClassShift | "Todos";

  setStoreSearch: (value: string) => void;
  setProductSearch: (value: string) => void;
  setSchoolListFilter: (value: SchoolListFilter) => void;
  setSelectedCategory: (value: ClassShift | "Todos") => void;
  resetProductFilters: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  storeSearch: "",
  productSearch: "",
  storeListFilter: "all",
  selectedCategory: "Todos",

  setStoreSearch: (value) => set({ storeSearch: value }),
  setProductSearch: (value) => set({ productSearch: value }),
  setSchoolListFilter: (value) => set({ storeListFilter: value }),
  setSelectedCategory: (value) => set({ selectedCategory: value }),
  resetProductFilters: () =>
    set({
      productSearch: "",
      selectedCategory: "Todos",
    }),
}));
