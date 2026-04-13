import { create } from "zustand";
import type { ClassShift } from "../types/class.types";

export type ClassFilterValue = ClassShift | "Todos";

type ClassesUiState = {
  classSearch: string;
  selectedShift: ClassFilterValue;
  setClassSearch: (value: string) => void;
  setSelectedShift: (value: ClassFilterValue) => void;
  resetClassFilters: () => void;
};

export const useClassesUiStore = create<ClassesUiState>((set) => ({
  classSearch: "",
  selectedShift: "Todos",

  setClassSearch: (value) => set({ classSearch: value }),
  setSelectedShift: (value) => set({ selectedShift: value }),
  resetClassFilters: () =>
    set({
      classSearch: "",
      selectedShift: "Todos",
    }),
}));
