import { renderHook } from "@testing-library/react-native";
import { useFilteredList } from "./use-filtered-list";

type Item = {
  id: string;
  name: string;
  description: string;
};

const items: Item[] = [
  { id: "1", name: "Apple", description: "A fruit" },
  { id: "2", name: "Banana", description: "Yellow fruit" },
  { id: "3", name: "Carrot", description: "A vegetable" },
];

describe("useFilteredList", () => {
  it("returns all items when search query is empty", () => {
    const { result } = renderHook(() =>
      useFilteredList(
        items,
        "",
        (item) => [item.name, item.description],
        null,
      ),
    );

    expect(result.current).toEqual(items);
  });

  it("filters items based on search query", () => {
    const { result } = renderHook(() =>
      useFilteredList(
        items,
        "fruit",
        (item) => [item.name, item.description],
        null,
      ),
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0]!.name).toBe("Apple");
    expect(result.current[1]!.name).toBe("Banana");
  });

  it("applies custom filter function", () => {
    const { result } = renderHook(() =>
      useFilteredList(
        items,
        "",
        (item) => [item.name, item.description],
        (item) => item.name.startsWith("A"),
      ),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]!.name).toBe("Apple");
  });

  it("combines search and filter", () => {
    const { result } = renderHook(() =>
      useFilteredList(
        items,
        "a",
        (item) => [item.name, item.description],
        (item) => item.description.includes("fruit"),
      ),
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0]!.name).toBe("Apple");
    expect(result.current[1]!.name).toBe("Banana");
  });

  it("is case insensitive", () => {
    const { result } = renderHook(() =>
      useFilteredList(
        items,
        "BANANA",
        (item) => [item.name, item.description],
        null,
      ),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0]!.name).toBe("Banana");
  });
});
