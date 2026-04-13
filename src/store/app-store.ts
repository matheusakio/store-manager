import { useSchoolsUiStore } from "@/features/schools/store/schools-ui.store";
import { useClassesUiStore } from "@/features/classes/store/classes-ui.store";

export const useAppStore = <T>(
  selector: (state: {
    storeSearch: string;
    productSearch: string;
    storeListFilter: "all" | "with-products" | "empty";
    selectedCategory:
      | "Todos"
      | "Matutino"
      | "Vespertino"
      | "Noturno"
      | "Integral";
    setStoreSearch: (value: string) => void;
    setProductSearch: (value: string) => void;
    setSchoolListFilter: (value: "all" | "with-products" | "empty") => void;
    setSelectedCategory: (
      value: "Todos" | "Matutino" | "Vespertino" | "Noturno" | "Integral",
    ) => void;
    resetProductFilters: () => void;
  }) => T,
): T => {
  const schoolSearch = useSchoolsUiStore((state) => state.schoolSearch);
  const schoolListFilter = useSchoolsUiStore((state) => state.schoolListFilter);
  const setSchoolSearch = useSchoolsUiStore((state) => state.setSchoolSearch);
  const setSchoolListFilterReal = useSchoolsUiStore(
    (state) => state.setSchoolListFilter,
  );

  const classSearch = useClassesUiStore((state) => state.classSearch);
  const selectedShift = useClassesUiStore((state) => state.selectedShift);
  const setClassSearch = useClassesUiStore((state) => state.setClassSearch);
  const setSelectedShift = useClassesUiStore((state) => state.setSelectedShift);
  const resetClassFilters = useClassesUiStore(
    (state) => state.resetClassFilters,
  );

  return selector({
    storeSearch: schoolSearch,
    productSearch: classSearch,
    storeListFilter:
      schoolListFilter === "with-classes" ? "with-products" : schoolListFilter,
    selectedCategory: selectedShift,
    setStoreSearch: setSchoolSearch,
    setProductSearch: setClassSearch,
    setSchoolListFilter: (value) =>
      setSchoolListFilterReal(
        value === "with-products" ? "with-classes" : value,
      ),
    setSelectedCategory: setSelectedShift,
    resetProductFilters: resetClassFilters,
  });
};
