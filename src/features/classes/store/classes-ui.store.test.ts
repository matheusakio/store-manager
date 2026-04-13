import { useClassesUiStore } from "./classes-ui.store";

describe("useClassesUiStore", () => {
  beforeEach(() => {
    useClassesUiStore.setState({
      classSearch: "",
      selectedShift: "Todos",
    });
  });

  it("updates classSearch", () => {
    useClassesUiStore.getState().setClassSearch("5º Ano");
    expect(useClassesUiStore.getState().classSearch).toBe("5º Ano");
  });

  it("updates selectedShift", () => {
    useClassesUiStore.getState().setSelectedShift("Matutino");
    expect(useClassesUiStore.getState().selectedShift).toBe("Matutino");
  });
});
