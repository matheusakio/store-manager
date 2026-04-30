import { renderHook } from "@testing-library/react-native";
import { useFilteredEntities } from "./use-filtered-entities";

describe("useFilteredEntities", () => {
  const items = [
    { id: "1", name: "Apple", category: "fruit" },
    { id: "2", name: "Banana", category: "fruit" },
    { id: "3", name: "Carrot", category: "vegetable" },
  ];

  it("returns all items when search query is empty", () => {
    const { result } = renderHook(() =>
      useFilteredEntities({
        items,
        searchQuery: "",
        getSearchableFields: (item) => [item.name, item.category],
      }),
    );

    expect(result.current).toEqual(items);
  });

  it("filters items by search query", () => {
    const { result } = renderHook(() =>
      useFilteredEntities({
        items,
        searchQuery: "app",
        getSearchableFields: (item) => [item.name, item.category],
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.name).toBe("Apple");
  });

  it("is case insensitive", () => {
    const { result } = renderHook(() =>
      useFilteredEntities({
        items,
        searchQuery: "BANANA",
        getSearchableFields: (item) => [item.name, item.category],
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.name).toBe("Banana");
  });

  it("applies custom filter function", () => {
    const { result } = renderHook(() =>
      useFilteredEntities({
        items,
        searchQuery: "",
        getSearchableFields: (item) => [item.name, item.category],
        filterFn: (item) => item.category === "fruit",
      }),
    );

    expect(result.current).toHaveLength(2);
    expect(result.current.every((item) => item.category === "fruit")).toBe(
      true,
    );
  });
});
