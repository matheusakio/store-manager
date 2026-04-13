import { create } from "zustand";

export type SchoolListFilter = "all" | "with-classes" | "empty";

type SchoolsUiState = {
  schoolSearch: string;
  schoolListFilter: SchoolListFilter;
  setSchoolSearch: (value: string) => void;
  setSchoolListFilter: (value: SchoolListFilter) => void;
  resetSchoolFilters: () => void;
};

export const useSchoolsUiStore = create<SchoolsUiState>((set) => ({
  schoolSearch: "",
  schoolListFilter: "all",

  setSchoolSearch: (value) => set({ schoolSearch: value }),
  setSchoolListFilter: (value) => set({ schoolListFilter: value }),
  resetSchoolFilters: () =>
    set({
      schoolSearch: "",
      schoolListFilter: "all",
    }),
}));
