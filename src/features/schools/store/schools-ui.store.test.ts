import { useSchoolsUiStore } from "./schools-ui.store";

describe("useSchoolsUiStore", () => {
  beforeEach(() => {
    useSchoolsUiStore.setState({
      schoolSearch: "",
      schoolListFilter: "all",
    });
  });

  it("has default values", () => {
    const state = useSchoolsUiStore.getState();
    expect(state.schoolSearch).toBe("");
    expect(state.schoolListFilter).toBe("all");
  });

  it("updates school search", () => {
    const { setSchoolSearch } = useSchoolsUiStore.getState();
    setSchoolSearch("test search");
    expect(useSchoolsUiStore.getState().schoolSearch).toBe("test search");
  });

  it("updates school filter", () => {
    const { setSchoolListFilter } = useSchoolsUiStore.getState();
    setSchoolListFilter("with-classes");
    expect(useSchoolsUiStore.getState().schoolListFilter).toBe("with-classes");
  });
});
