import { renderHook } from "@testing-library/react-native";
import { useClasses } from "./use-classes";

describe("useClasses", () => {
  it("returns classes data and functions", () => {
    const { result } = renderHook(() => useClasses("school-1"));
    
    expect(Array.isArray(result.current.classes)).toBe(true);
    expect(typeof result.current.isLoading).toBe("boolean");
    expect(typeof result.current.error).toBe("string");
    expect(typeof result.current.refetch).toBe("function");
  });
});
