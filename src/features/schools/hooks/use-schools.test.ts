import { renderHook } from "@testing-library/react-native";
import { useSchools } from "./use-schools";

describe("useSchools", () => {
  it("returns schools data and functions", () => {
    const { result } = renderHook(() => useSchools());
    
    expect(Array.isArray(result.current.schools)).toBe(true);
    expect(typeof result.current.isLoading).toBe("boolean");
    expect(typeof result.current.error).toBe("string");
    expect(typeof result.current.getSchoolById).toBe("function");
    expect(typeof result.current.refetch).toBe("function");
  });
});
